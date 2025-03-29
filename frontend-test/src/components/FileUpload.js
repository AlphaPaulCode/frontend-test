// FileUpload.js
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Typography, Button, CircularProgress, Card, Snackbar, Alert } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import mammoth from "mammoth";
import { PDFDocument, rgb } from "pdf-lib";

export default function FileUpload({ onFileUpload }) {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Helper: Create a PDF from extracted text using PDF-lib
  const createPdfFromText = async (text) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    page.drawText(text, {
      x: 50,
      y: height - 50,
      size: 12,
      color: rgb(0, 0, 0),
      maxWidth: width - 100,
    });
    return await pdfDoc.save();
  };

  // Helper: Extract text from DOCX using Mammoth
  const extractTextFromDocx = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value || "No text extracted.";
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Accept PDF and DOCX; reject DOC files.
    if (
      file.type === "application/pdf" ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setFileName(file.name);
      setLoading(true);

      try {
        if (file.type === "application/pdf") {
          const buffer = await file.arrayBuffer();
          // Pass the PDF buffer as-is
          onFileUpload(buffer, file.name, "application/pdf");
        } else {
          // For DOCX: extract text and then create a PDF
          const text = await extractTextFromDocx(file);
          const pdfBytes = await createPdfFromText(text);
          // Replace extension with .pdf
          const newName = file.name.replace(/\.(docx)$/i, ".pdf");
          onFileUpload(pdfBytes, newName, "application/pdf");
        }
        setSuccess("File uploaded successfully!");
      } catch (err) {
        console.error(err);
        setError("Failed to process the file.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please upload a valid PDF or DOCX file.");
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
    },
  });

  return (
    <>
      <Card
        {...getRootProps()}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          border: "2px dashed #ccc",
          borderRadius: 2,
          cursor: "pointer",
          "&:hover": { borderColor: "primary.main" }
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon color="primary" sx={{ fontSize: 50, mb: 1 }} />
        <Typography variant="body1">
          {isDragActive
            ? "Drop the file here..."
            : "Drag & drop a PDF or DOCX file here, or click to select one"}
        </Typography>
        {loading ? (
          <CircularProgress sx={{ mt: 2 }} size={24} />
        ) : (
          fileName && (
            <Typography variant="caption" sx={{ mt: 1, color: "text.secondary" }}>
              {fileName}
            </Typography>
          )
        )}
        <Button variant="contained" sx={{ mt: 2 }}>
          Select File
        </Button>
      </Card>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={() => setError("")} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={() => setSuccess("")} severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
    </>
  );
}
