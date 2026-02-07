'use client';

import { useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.min.mjs';
import "../../styles/upload-doc.css"
interface UploadDocProps {
    onPdfProcessed: (text: string, extractedItems: any[]) => void;
    isProcessing: boolean;
    setIsProcessing: (value: boolean) => void;
    uploadError: string;
    setUploadError: (value: string) => void;
    previewText: string;
    setPreviewText: (value: string) => void;
}

export default function UploadDoc({
    onPdfProcessed,
    isProcessing,
    setIsProcessing,
    uploadError,
    setUploadError,
    previewText,
    setPreviewText
}: UploadDocProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const extractTableData = (text: string): any[] => {
        const lines = text.split('\n');
        const items: any[] = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (/^\d+\s+\d{8}/.test(line)) {
                const parts = line.split(/\s+/);
                if (parts.length >= 10) {
                    items.push({
                        sn: parts[0] || '',
                        hsn: parts[1] || '',
                        productName: parts.slice(2, parts.length - 13).join(' ') || '',
                        pack: parts[parts.length - 13] || '',
                        qty: parts[parts.length - 12] || '',
                        batch: parts[parts.length - 10] || '',
                        mfg: parts[parts.length - 9] || '',
                        exp: parts[parts.length - 8] || '',
                        mrp: parts[parts.length - 7] || '',
                        rate: parts[parts.length - 6] || '',
                        dis: parts[parts.length - 5] || '',
                        sgst: parts[parts.length - 4] || '',
                        value: parts[parts.length - 3] || '',
                        cgst: parts[parts.length - 2] || '',
                        cgstValue: parts[parts.length - 1] || '',
                    });
                }
            }
        }

        return items;
    };

    const handlePdfUpload = async (file: File) => {
        if (!file) return;

        setUploadError('');
        setIsProcessing(true);

        try {
            if (file.size > 10 * 1024 * 1024) {
                setUploadError('File size must be less than 10MB');
                setIsProcessing(false);
                return;
            }

            if (file.type !== 'application/pdf') {
                setUploadError('Please upload a valid PDF file');
                setIsProcessing(false);
                return;
            }

            const buffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

            let fullText = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const pageText = content.items
                    .map((item: any) => item.str)
                    .join(' ');
                fullText += pageText + '\n';
            }

            setPreviewText(fullText.slice(0, 500));

            // Extract table data
            const extractedItems = extractTableData(fullText);
            
            // Call parent callback with extracted data
            onPdfProcessed(fullText, extractedItems);

        } catch (error) {
            console.error('PDF processing error:', error);
            setUploadError('Failed to process PDF. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <section className="card">
            <h2>Upload Document</h2>
            <div
                className={`upload-area ${isProcessing ? 'loading' : ''}`}
                onClick={() => !isProcessing && fileInputRef.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    if (!isProcessing) {
                        e.currentTarget.style.backgroundColor = '#e8edff';
                    }
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.backgroundColor = '';
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.backgroundColor = '';
                    if (!isProcessing) {
                        const files = e.dataTransfer.files;
                        if (files.length > 0 && files[0].type === 'application/pdf') {
                            handlePdfUpload(files[0]);
                        }
                    }
                }}
            >
                {isProcessing ? (
                    <>Processing document...</>
                ) : (
                    <>Click to browse or drag and drop your PDF file here</>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={(e) => e.target.files && handlePdfUpload(e.target.files[0])}
                    disabled={isProcessing}
                />
            </div>
            <p className="format-hint">
                Supported format: PDF (Max 10MB)
            </p>

            {uploadError && (
                <div style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    background: '#fee2e2',
                    border: '1px solid #fecaca',
                    borderRadius: '8px',
                    color: '#991b1b',
                    fontSize: '14px'
                }}>
                    {uploadError}
                </div>
            )}

            {/* {previewText && (
                <div>
                    <h3 style={{ marginTop: '24px', marginBottom: '12px', fontSize: '1.1rem', fontWeight: '600' }}>
                        Extracted Text Preview:
                    </h3>
                    <pre className="preview">{previewText}...</pre>
                </div>
            )} */}
        </section>
    );
}