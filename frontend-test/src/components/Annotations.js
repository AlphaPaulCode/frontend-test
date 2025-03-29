import { useEffect, useRef, useState } from "react";

const Annotations = ({ pdfRef }) => {
  const canvasRef = useRef(null);
  const [fabric, setFabric] = useState(null);

  useEffect(() => {
    import("fabric").then((mod) => {
      setFabric(mod.fabric);
    });
  }, []);

  useEffect(() => {
    if (fabric && pdfRef?.current && canvasRef?.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.width = 3;
      canvas.freeDrawingBrush.color = "red";

      const addText = () => {
        const text = new fabric.Textbox("Comment", {
          left: 100,
          top: 100,
          width: 200,
          fontSize: 14,
          fill: "black",
          backgroundColor: "white",
          borderColor: "black",
          editable: true,
        });
        canvas.add(text);
      };

      const addSignature = () => {
        const signature = new fabric.Path("M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80", {
          stroke: "black",
          fill: "transparent",
          strokeWidth: 2,
        });
        canvas.add(signature);
      };

      // Event listeners for annotation buttons
      document.getElementById("highlightBtn")?.addEventListener("click", () => {
        canvas.freeDrawingBrush.color = "yellow";
      });

      document.getElementById("underlineBtn")?.addEventListener("click", () => {
        canvas.freeDrawingBrush.color = "blue";
      });

      document.getElementById("commentBtn")?.addEventListener("click", addText);
      document.getElementById("signatureBtn")?.addEventListener("click", addSignature);

      return () => {
        canvas.dispose();
      };
    }
  }, [fabric, pdfRef]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default Annotations;
