import { InvoiceResponse } from "../app/types/invoice";

export const invoiceData: InvoiceResponse = {
    "dealerInformation": {
        "name": "NIYATI HEALTHCARE",
        "address": "SHOP NO.14, GROUND FLOOR, ANANDI PARK, DATIVALI SMASHAN BHUMI ROAD, DATIVALI, DIVA EAST, THANE",
        "phone": "9869385999",
        "email": "niyatihealthcare9@gmail.com",
        "gstin": "27AZAPC0308C1ZB",
        "drugLicense": "21B-MH-MZ2-441870"
    },
    "patientInformation": {
        "patientName": "Abhi SHAIKH",
        "ppfNo": "8133973",
        "mjpjayNo": "8133973",
        "hospital": "NAIR HOSPITAL",
        "invoiceNo": "NS-012",
        "invoiceDate": "09-05-2025",
        "dueDate": "09-05-2025"
    },

   "items": [
        {
            "sn": 1,
            "hsn": "3A0049099",
            "productName": "Cap. Tacstead 1.0mg",
            "pack": 1,
            "qty": 48,
            "batch": "SMIC-25010",
            "mfg": "stead",
            "mrp": 447.5,
            "rate": 255,
            "sgst": 6,
            "cgst": 6,
            "total": 734.4
        },
        {
            "sn": 2,
            "hsn": "3A0049099",
            "productName": "Cap. Tacstead 0.5mg",
            "pack": 1,
            "qty": 24,
            "batch": "SMIC-25009",
            "mfg": "stead",
            "mrp": 230,
            "rate": 168,
            "sgst": 6,
            "cgst": 6,
            "total": 241.92
        },
        {
            "sn": 3,
            "hsn": "3A0049099X",
            "productName": "Cap.Tacstead 0.25mg",
            "pack": 1,
            "qty": 24,
            "batch": "SMSC-24045",
            "mfg": "stead",
            "mrp": 140,
            "rate": 108,
            "sgst": 6,
            "cgst": 6,
            "total": 155.52
        },
        {
            "sn": 4,
            "hsn": "30X049099",
            "productName": "MYSTEAD 500MG",
            "pack": 1,
            "qty": 58,
            "batch": "SMST-24334",
            "mfg": "stead",
            "mrp": 775,
            "rate": 470,
            "sgst": 2.5,
            "cgst": 2.5,
            "total": 681.5
        }
    ]
};
