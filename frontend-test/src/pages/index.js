import { useState, useRef } from "react";
import FileUpload from "@/components/FileUpload";
import PDFViewer from "@/components/PDFViewer";
import Annotations from "@/components/Annotations";
import Toolbar from "@/components/Toolbar";
import ExportPDF from "@/components/ExportPDF";

export default function Home() {
  const [pdfData, setPdfData] = useState(null);
  const [pdfFileName, setPdfFileName] = useState(""); 
  const pdfRef = useRef(null);

  const handleFileUpload = (fileBuffer, fileName) => {
    setPdfData(fileBuffer);
    setPdfFileName(fileName);
  };

  return (
    <div className="p-5">
      <FileUpload onFileUpload={handleFileUpload} />
      {pdfData && <Toolbar />}
      <div className="relative">
        <PDFViewer pdfData={pdfData} ref={pdfRef} />
        <Annotations pdfRef={pdfRef} />
      </div>
      {pdfData && <ExportPDF pdfFile={pdfData} pdfFileName={pdfFileName} />}
    </div>
  );
}
