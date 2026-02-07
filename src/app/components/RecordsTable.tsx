import { useState, useMemo, useRef } from "react";
import { Search, Trash2, Eye, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import "../../styles/records-table.css";
import { useRouter } from "next/navigation";


export default function RecordsList({
  records,
  onDelete,
  onView,
  onUploadDoc,
}: {
  records: any[];
  onDelete: (index: number) => void;
  onView: (record: any) => void;
  onUploadDoc?: (file: File) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsPerPage = 10;

 

  const router = useRouter();


  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const searchLower = searchTerm.toLowerCase();
      const patientName = record.patientInformation?.patientName || "";
      const phone = record.patientInformation?.phone || "";
      const email = record.patientInformation?.email || "";
      const invoiceNo = record.patientInformation?.invoiceNo || "";

      return (
        patientName.toLowerCase().includes(searchLower) ||
        phone.includes(searchLower) ||
        email.toLowerCase().includes(searchLower) ||
        invoiceNo.includes(searchLower)
      );
    });
  }, [records, searchTerm]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecords = filteredRecords.slice(startIndex, endIndex);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getOriginalIndex = (displayIndex: number) => {
    return records.findIndex(
      (record) =>
        record.patientInformation?.invoiceNo ===
        currentRecords[displayIndex].patientInformation?.invoiceNo
    );
  };

  return (
    <div className="records-container">
      <div className="records-header">
        <div className="header-top">
          <h3 className="records-title">
            Records <span className="record-count">{filteredRecords.length}</span>
          </h3>
          <button
            className="btn-upload-doc"
              onClick={() => router.push("/uploadDoc")}
            title="Upload Document"
          >
            <Plus size={20} />
            Upload Doc
          </button>
         
        </div>

        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, phone, email, or invoice..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="records-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Patient Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Invoice No.</th>
              <th>Invoice Date</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentRecords.length === 0 && (
              <tr className="empty-row">
                <td colSpan={8}>
                  <div className="empty-state">
                    {records.length === 0 ? "No records yet" : "No results found"}
                  </div>
                </td>
              </tr>
            )}

            {currentRecords.map((record, displayIndex) => {
              const originalIndex = getOriginalIndex(displayIndex);
              return (
                <tr key={displayIndex} className="table-row">
                  <td className="cell-number">{startIndex + displayIndex + 1}</td>
                  <td className="cell-name">
                    {record.patientInformation?.patientName}
                  </td>
                  <td className="cell-phone">{record.patientInformation?.phone}</td>
                  <td className="cell-email">{record.patientInformation?.email}</td>
                  <td className="cell-invoice">{record.patientInformation?.invoiceNo}</td>
                  <td className="cell-date">{record.patientInformation?.invoiceDate}</td>
                  <td className="cell-total">₹{record.total || 0}</td>
                  <td className="cell-actions">
                    <button
                      className="btn-view"
                      onClick={() => onView(record)}
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => onDelete(originalIndex)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title="Previous page"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="pagination-info">
            <span className="page-input">
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value) || 1;
                  handlePageChange(page);
                }}
                className="page-number-input"
              />
              <span className="page-separator">/</span>
              <span className="total-pages">{totalPages}</span>
            </span>
            <span className="records-info">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredRecords.length)} of{" "}
              {filteredRecords.length}
            </span>
          </div>

          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
