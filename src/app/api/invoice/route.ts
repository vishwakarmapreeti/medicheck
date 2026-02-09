import { NextResponse } from "next/server";
import DocumentIntelligence, {
    getLongRunningPoller,
    isUnexpected,
} from "@azure-rest/ai-document-intelligence";



import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { AzureOpenAI } from "openai";

/* =======================
   ENV VARIABLES
======================= */
const DI_KEY = process.env.KEY1!;
const DI_ENDPOINT = process.env.ENDPOINT1!;

const OPENAI_API_KEY = process.env.APIKEY2!;
const OPENAI_ENDPOINT = process.env.ENDPOINT2!;
const OPENAI_API_VERSION = "2024-04-01-preview";
const OPENAI_DEPLOYMENT = "gpt-4o";

/* =======================
   OPENAI CLIENT
======================= */
const openai = new AzureOpenAI({
    apiKey: OPENAI_API_KEY,
    endpoint: OPENAI_ENDPOINT,
    apiVersion: OPENAI_API_VERSION,
    deployment: OPENAI_DEPLOYMENT,
});

/* =======================
   DOCUMENT INTELLIGENCE
======================= */
async function documentProcessing(filePath: string): Promise<string> {
    const fileBuffer = fs.readFileSync(filePath);

    const diClient = DocumentIntelligence(DI_ENDPOINT, {
        key: DI_KEY,
    });

    const initialResponse = await diClient
        .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
        .post({
            contentType: "application/pdf",
            body: fileBuffer,
        });

    if (isUnexpected(initialResponse)) {
        throw new Error(initialResponse.body.error.message);
    }

    const poller = getLongRunningPoller(diClient, initialResponse);
    const analyzeResult = (await poller.pollUntilDone()).body.analyzeResult;

    return analyzeResult.content;
}


const jsonDir = path.join(process.cwd(), "generated-json");
if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir)
}




/* =======================
   GENAI PROCESSING
======================= */
async function genAIProcessing(inputText: string): Promise<any> {
    const PROMPT = `
Extract pharmacy invoice data from the text below and return JSON
matching THIS STRUCTURE EXACTLY. Use null if data is missing.
Return ONLY valid JSON maching the STRUCTURE EXACTLY, DO NOT INFER. Do not add any extra information.

{
  "dealerInformation": {
    "name": string | null,
    "address": string | null,
    "phone": string | null,
    "email": string | null,
    "gstin": string | null,
    "drugLicense": string | null
    "grandTotal": string | null
  },
  "patientInformation": {
    "patientName": string | null,
    "ppfNo": string | null,
    "mjpjayNo": string | null,
    "hospital": string | null,
    "invoiceNo": string | null,
    "invoiceDate": string | null,
    "dueDate": string | null
  },
  "items": [
    {
      "sn": number | null,
      "hsn": string | null,
      "productName": string | null,
      "pack": number | null,
      "qty": number | null,
      "batch": string | null,
      "mfg": string | null,
      "exp": string | null,
      "mrp": number | null,
      "rate": number | null,
      "dis": number | null,
      "sgst": number | null,
      "cgst": number | null,
      "total": number | null
    }
  ]
}

Invoice text:
${inputText}
`;

    const response = await openai.chat.completions.create({
        model: OPENAI_DEPLOYMENT,
        temperature: 0,
        max_tokens: 800,
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: PROMPT }],
    });

    const result = response.choices[0].message.content;
    return JSON.parse(result);
}

/* =======================
   POST API
======================= */
export async function POST(req: Request) {
    try {
        console.log("📥 POST /api/invoice called");

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            console.error("❌ No file received");
            return NextResponse.json({ error: "No file" }, { status: 400 });
        }

        console.log("📄 File received:", file.name, file.size);

        const buffer = Buffer.from(await file.arrayBuffer());

        const tempDir = path.join(process.cwd(), "tmp");
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

        const filePath = path.join(tempDir, `${randomUUID()}.pdf`);
        fs.writeFileSync(filePath, buffer);

        console.log("📂 File saved to:", filePath);

        console.log("🔍 Running Document Intelligence...");
        const extractedText = await documentProcessing(filePath);

        console.log("🧠 Running OpenAI...");
        const invoiceJson = await genAIProcessing(extractedText);

        // unique file name 
        const jsonFilePath = path.join(
            jsonDir,
            `invoice-${randomUUID()}.json`
        )
        fs.writeFileSync(
            jsonFilePath,
            JSON.stringify(invoiceJson, null, 2), // pretty format
            "utf-8"
        );

        console.log("📝 JSON saved to:", jsonFilePath);

        // 👀 CHECK JSON HERE
        console.log("🟢 FINAL INVOICE JSON:");
        console.dir(invoiceJson, { depth: null, color: true });

        fs.unlinkSync(filePath);

        console.log("✅ Processing complete");

        return NextResponse.json({
            success: true,
            data: invoiceJson,
        });


    } catch (error: any) {
        console.error("🔥 API ERROR:", error);
        return NextResponse.json(
            { error: error.message || "Internal error" },
            { status: 500 }
        );
    }
}
