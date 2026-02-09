"use client";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../styles/view-invoice-modal.css";

export default function ViewInvoiceModal({
    show,
    onClose,
    invoice,
}: any) {
    if (!invoice) return null;

    const { patientInformation, dealerInformation, items } = invoice;

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton className="modal-header-custom">
                <Modal.Title>Invoice Details</Modal.Title>
            </Modal.Header>

            <Modal.Body className="modal-body-custom modal-scroll-body">

                {/* Patient Info */}
                <h5 className="section-title">Patient Information</h5>
                <p><b>Name:</b> {patientInformation.patientName}</p>
                <p><b>Phone:</b> {patientInformation.phone}</p>
                <p><b>Email:</b> {patientInformation.email}</p>
                <p><b>Address:</b> {patientInformation.address}</p>
                <p><b>PPF No:</b> {patientInformation.ppfNo}</p>
                <p><b>MJPJAY No:</b> {patientInformation.mjpjayNo}</p>
                <p><b>Hospital:</b> {patientInformation.hospital}</p>
                <p><b>Invoice No:</b> {patientInformation.invoiceNo}</p>
                <p><b>Invoice Date:</b> {patientInformation.invoiceDate}</p>
                <p><b>Address:</b> {patientInformation.address}</p>
                <p><b>Additional Info</b> {patientInformation.additionalInfo}</p>



                {/* Dealer Info */}
                <h5 className="section-title">Dealer Information</h5>
                <p><b>Name:</b> {dealerInformation.name}</p>
                <p><b>Phone:</b> {dealerInformation.phone}</p>
                <p><b>Email:</b> {dealerInformation.email}</p>

                <p><b>GSTIN:</b> {dealerInformation.gstin}</p>
                <p><b>Address:</b> {dealerInformation.address}</p>
                <p><b>Grand Total:</b> {dealerInformation.grandTotal}</p>


                {/* Items */}
                <h5 className="section-title">Items</h5>

                <div className="items-scroll">
                    <table className="table table-bordered items-table">
                        <thead>
                            <tr>
                        <th>S.N</th>
                        <th>HSN</th>
                        <th>Product Name</th>
                        <th>Pack</th>
                        <th>Qty</th>
                        <th>Free</th>
                        <th>Batch</th>
                        <th>MFG</th>
                        <th>EXP</th>
                        <th>MRP</th>
                        <th>Rate</th>
                        <th>Dis</th>
                        <th>SGST</th>
                        <th>Value</th>
                        <th>CGST</th>
                        <th>Value</th>
                        <th>Total</th>
                        <th>Total(+GST)</th>
                        
                    </tr>
                        </thead>

                        <tbody>
                       {items.map((item: any, index: number) => (
                        <tr key={index}>

                            <td>{item.sn}</td>
                            <td>{item.hsn}</td>

                            <td>{item.productName}</td>
                            <td>{item.pack}</td>

                            <td>{item.qty}</td>
                            <td>{item.free}</td>
                            <td>{item.batch}</td>
                            <td>{item.mrp}</td>
                            <td>{item.exp}</td>

                            <td>₹{item.mrp}</td>
                            <td>₹{item.rate}</td>
                            <td>{item.dis}</td>

                            <td>{item.sgst}</td>
                            <td>{item.total}</td>
                            <td>{item.cgst}</td>
                            <td>{item.total}</td>


                            <td>₹{(item.qty * item.rate)}</td>
                            <td>₹{(item.qty * item.rate) +2*item.total}</td>
                        </tr>
                    ))}
                        </tbody>
                    </table>
                </div>

            </Modal.Body>

            <Modal.Footer className="modal-footer-custom">
                <Button onClick={onClose} className="close-btn">
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
