import { useState, forwardRef, useImperativeHandle } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Paper, Typography, CircularProgress } from "@mui/material";

// Use the local worker from /public
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const PDFViewer = forwardRef(({ pdfData }, ref) => {
  const [numPages, setNumPages] = useState(null);

  useImperativeHandle(ref, () => ({
    getDocumentElement: () => document.querySelector(".react-pdf__Document"),
  }));

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, position: "relative" }}>
      {pdfData ? (
        <Document
          file={{ data: new Uint8Array(pdfData.slice(0)) }}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex flex-col items-center react-pdf__Document"
          loading={<CircularProgress sx={{ display: "block", mx: "auto" }} />}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={800}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      ) : (
        <Typography textAlign="center" color="textSecondary">
          No document uploaded
        </Typography>
      )}
    </Paper>
  );
});

PDFViewer.displayName = "PDFViewer";

export default PDFViewer;