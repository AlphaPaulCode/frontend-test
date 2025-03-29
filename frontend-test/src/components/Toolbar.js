import { useEffect } from "react";

const Toolbar = () => {
  useEffect(() => {
    const highlightBtn = document.getElementById("highlightBtn");
    const underlineBtn = document.getElementById("underlineBtn");
    const commentBtn = document.getElementById("commentBtn");
    const signatureBtn = document.getElementById("signatureBtn");

    if (!highlightBtn || !underlineBtn || !commentBtn || !signatureBtn) return;

    const handleHighlight = () => console.log("Highlighting text...");
    const handleUnderline = () => console.log("Underlining text...");
    const handleComment = () => console.log("Adding comment...");
    const handleSignature = () => console.log("Adding signature...");

    highlightBtn.addEventListener("click", handleHighlight);
    underlineBtn.addEventListener("click", handleUnderline);
    commentBtn.addEventListener("click", handleComment);
    signatureBtn.addEventListener("click", handleSignature);

    return () => {
      highlightBtn.removeEventListener("click", handleHighlight);
      underlineBtn.removeEventListener("click", handleUnderline);
      commentBtn.removeEventListener("click", handleComment);
      signatureBtn.removeEventListener("click", handleSignature);
    };
  }, []);

  return (
    <div className="flex gap-4 p-3 bg-gray-200 rounded-lg">
      <button id="highlightBtn" className="bg-yellow-400 px-3 py-2 rounded">Highlight</button>
      <button id="underlineBtn" className="bg-blue-400 px-3 py-2 rounded">Underline</button>
      <button id="commentBtn" className="bg-gray-500 text-white px-3 py-2 rounded">Add Comment</button>
      <button id="signatureBtn" className="bg-black text-white px-3 py-2 rounded">Add Signature</button>
    </div>
  );
};

export default Toolbar;
