PDF Annotation & Conversion Tool
Overview
This is a Next.js single-page application that allows users to upload documents (PDF and DOCX), annotate them (highlight, underline, add comments, and add signatures), and export the annotated document as a PDF. DOCX files are automatically converted into PDFs. (Note: While the annotation tools are implemented, the annotation integration wasn't fully polished due to time constraints.)

Setup and Running Instructions
Clone the repository:

bash
Copy
Edit
git clone <repository_url>
cd <repository_directory>
Install dependencies:

bash
Copy
Edit
npm install
This project uses the following libraries:

react-pdf: For rendering PDFs in the browser.

fabric.js: For creating an interactive annotation canvas.

pdf-lib: For editing and exporting PDF files.

mammoth: For extracting text from DOCX files.

@mui/material and @mui/icons-material: For UI components.

react-dropzone: For drag-and-drop file uploads.

Run the development server:

bash
Copy
Edit
npm run dev
Open http://localhost:3000 to view the application.

Libraries and Tools Used
Next.js: Provides a robust framework for server-rendered React applications and SPA design.

react-pdf: Enables rendering of PDF files in the browser.

fabric.js: Used to overlay an interactive annotation canvas on the PDF.

pdf-lib: Handles PDF editing and exporting.

mammoth: Extracts text from DOCX files, allowing conversion into PDF.

@mui/material: Supplies a sleek and modern UI for the application.

react-dropzone: Simplifies file uploads with drag-and-drop functionality.

Challenges and Solutions
File Conversion
Converting DOCX files to PDF in the browser was challenging. I used Mammoth to extract raw text and pdf-lib to create a new PDF from that text. Unfortunately, DOC files aren’t supported due to the lack of a reliable in-browser converter.

Annotation Integration
Overlaying an interactive annotation canvas on top of the rendered PDF required careful coordination between react-pdf and fabric.js. Due to time constraints, the annotations feature (highlighting, underlining, comments, and signatures) is functional but not as refined as I would like.

Future Enhancements
Complete Annotation Tools:
With more time, I would polish the annotation features to allow:

Freehand drawing (for signatures).

Sticky notes and more advanced comment capabilities.

Better merging of the annotation canvas with the original PDF during export.

Support for DOC Files:
Integrate a robust DOC-to-PDF conversion tool, possibly via an external API.

UI/UX Improvements:
Further refine the user interface and provide smoother transitions and more feedback during file conversion, annotation, and export processes.

Export Merge:
Seamlessly merge annotations from the interactive canvas into the exported PDF so that the final output looks like the original document with embedded annotations.
