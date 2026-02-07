"use client";

import { useEffect, useState } from "react";
import PatientForm from "./components/PatientForm";
import DealerForm from "./components/Dealerform";
import ItemsTable from "./components/ItemsTable";
import "../styles/page.css";
import RecordsTable from "./components/RecordsTable";
import ViewInvoiceModal from "./components/ViewInvoiceModal";
import UploadDoc from "./components/UploadDoc";

/* 1️ Empty structure */
const emptyInvoice = {
  patientInformation: {
    patientName: "",
    phone: "",
    email: "",
    address: "",
    additionalInfo: "",
    ppfNo: "",
    mjpjayNo: "",
    hospital: "",
    invoiceNo: "",
    invoiceDate: "",
  },
  dealerInformation: {
    name: "",
    phone: "",
    email: "",
    gstin: "",
    address: "",
  },
  items: [],
};

export default function Page() {
  /* 2️Page loads with EMPTY data */
  const [invoice, setInvoice] = useState(emptyInvoice);
  const [records, setRecords] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);


  /*  LOAD RECORDS WHEN PAGE OPENS */
  useEffect(() => {
    const savedRecords = localStorage.getItem("records");
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  /* RUN button fills data */
  async function handleRun() {
    const res = await fetch("/api/invoice");
    const json = await res.json();

    setInvoice(json.data);
  }

  // submit button
  function handleSubmit() {
    const updatedRecords = [...records, invoice];
    // 2️ Update records state (THIS WAS MISSING)
    setRecords(updatedRecords);
    localStorage.setItem("records", JSON.stringify(updatedRecords));

    setInvoice(emptyInvoice); // optional reset
  }


  function handleView(record: any) {
    setSelectedInvoice(record);
    setShowModal(true);
  }

  /* DELETE RECORD */
  function handleDeleteRecord(index: number) {
    const updatedRecords = records.filter((_, i) => i !== index);

    setRecords(updatedRecords);
    localStorage.setItem("records", JSON.stringify(updatedRecords));
  }
  return (
    <>
      <button onClick={handleRun} className="run-btn">
        RUN
      </button>

      {/* Forms are ALWAYS visible */}
      {/* <UploadDoc/> */}
      <PatientForm patient={invoice.patientInformation} />
      <DealerForm dealer={invoice.dealerInformation} />
      <ItemsTable items={invoice.items} />
      <button onClick={handleSubmit} className="submit-btn">
        SUBMIT
      </button>

      <RecordsTable
        records={records}
        onDelete={handleDeleteRecord}
        onView={handleView}
      />

      <ViewInvoiceModal
        show={showModal}
        onClose={() => setShowModal(false)}
        invoice={selectedInvoice}
      />

    </>
  );
}
