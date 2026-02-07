import "../../../src/styles/patient-form.css";

export default function PatientForm({ patient }: any) {
  return (
    <section className="patient-card">
      <div className="patient-header">
        <h3 className="patient-title">Patient Information</h3>
        <div className="header-decoration"></div>
      </div>

      <div className="patient-grid">
        <Field label="Patient Name" value={patient.patientName} />
        <Field label="Phone" value={patient.phone} />
        <Field label="Email" value={patient.email} />
        <Field label="PPF No" value={patient.ppfNo} />
        <Field label="MJPJAY No" value={patient.mjpjayNo} />
        <Field label="Hospital" value={patient.hospital} />
        <Field label="Invoice No" value={patient.invoiceNo} />
        <Field label="Invoice Date" value={patient.invoiceDate} />
      </div>

      <div className="patient-full">
        <Field label="Address" value={patient.address} />
        <Field label="Additional Info" value={patient.additionalInfo} />
      </div>
    </section>
  );
}

function Field({ label, value }: any) {
  return (
    <div className="patient-field">
      <label>{label}</label>
      <input value={value} readOnly />
    </div>
  );
}
