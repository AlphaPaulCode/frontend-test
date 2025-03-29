import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Typography, Button, CircularProgress, Card, Snackbar, Alert } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function FileUpload({ onFileUpload }) {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      setLoading(true);

      file.arrayBuffer().then((buffer) => {
        onFileUpload(buffer, file.name); 
        setLoading(false);
      });
    } else {
      setError("Please upload a valid PDF file.");
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf"
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
          {isDragActive ? "Drop the PDF file here..." : "Drag & drop a PDF file here, or click to select one"}
        </Typography>

        {loading ? (
          <CircularProgress sx={{ mt: 2 }} size={24} />
        ) : (
          fileName && <Typography variant="caption" sx={{ mt: 1, color: "text.secondary" }}>{fileName}</Typography>
        )}

        <Button variant="contained" sx={{ mt: 2 }}>Select PDF</Button>
      </Card>

      {/* Snackbar Alert for Error Messages */}
      <Snackbar 
        open={!!error} 
        autoHideDuration={3000} 
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setError("")} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
