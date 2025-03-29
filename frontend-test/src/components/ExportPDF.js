import { useState } from "react";
import { saveAs } from "file-saver";
import { PDFDocument, rgb } from "pdf-lib";
import { Button, Snackbar, Alert } from "@mui/material";

const ExportPDF = ({ pdfFile, pdfFileName }) => {
  const [error, setError] = useState("");

  const handleExport = async () => {
    if (!pdfFile) {
      setError("Upload a document first!");
      return;
    }

    try {
      // If pdfFile is an ArrayBuffer, use it directly.
      // Otherwise, if it has an arrayBuffer method (like a File or Blob), call that.
      const existingPdfBytes =
        pdfFile instanceof ArrayBuffer
          ? pdfFile
          : typeof pdfFile.arrayBuffer === "function"
          ? await pdfFile.arrayBuffer()
          : pdfFile;
      
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const page = pdfDoc.getPages()[0];
      const { height } = page.getSize();

      // Example annotation: Draw a sample annotation on the first page
      page.drawText("Annotation Example", {
        x: 50,
        y: height - 100,
        size: 12,
        color: rgb(1, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();
      const exportFileName = pdfFileName?.replace(/\.(pdf)$/i, "") || "exported-document";

      saveAs(new Blob([pdfBytes], { type: "application/pdf" }), `${exportFileName}.pdf`);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      setError("Failed to export PDF. Please try again.");
    }
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={handleExport} sx={{ mt: 2 }}>
        Export PDF
      </Button>
      
      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError("")}>
        <Alert onClose={() => setError("")} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ExportPDF;
