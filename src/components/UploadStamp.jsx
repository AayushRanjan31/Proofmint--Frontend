import { useRef } from "react";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import axios from "axios";
import certFile from "../assets/certificate.png";
import stampImg from "../assets/stamp.png";

export default function CertificateWithStamp() {
  const certRef = useRef(null);
  const nodeRef = useRef(null);

  // Preview (send to backend)
  const handlePreview = async () => {
    const canvas = await html2canvas(certRef.current, { scale: 2 });
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );

    const formData = new FormData();
    formData.append("file", blob, "certificate.png");

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        alert("✅ Preview saved successfully on backend.");
      }
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Upload failed");
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      {/* Certificate + Stamp */}
      <div ref={certRef} className="relative inline-block">
        <img
          src={certFile}
          alt="certificate"
          className="block max-w-full"
        />

        {/* Draggable stamp */}
        <Draggable nodeRef={nodeRef} defaultPosition={{ x: 50, y: 50 }}>
          <img
            ref={nodeRef}
            src={stampImg}
            alt="stamp"
            className="absolute w-24 cursor-move top-0 left-0"
          />
        </Draggable>
      </div>

      {/* Preview button */}
      <button
        onClick={handlePreview}
        className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
      >
        Preview
      </button>
    </div>
  );
}
