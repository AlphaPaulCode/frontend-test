import { useState } from "react";
import FileUpload from "./FileUpload"; // Ensure correct import path
import ExportPDF from "./ExportPDF"; // Ensure correct import path

export default function PDFHandler() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileName, setPdfFileName] = useState("");

  const handleFileUpload = (fileBuffer, fileName) => {
    setPdfFile(fileBuffer);
    setPdfFileName(fileName);
  };

  return (
    <div>
      <FileUpload onFileUpload={handleFileUpload} />
      {pdfFile && <ExportPDF pdfFile={pdfFile} pdfFileName={pdfFileName} />}
    </div>
  );
}