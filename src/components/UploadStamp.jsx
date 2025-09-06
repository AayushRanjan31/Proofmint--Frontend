import { useRef, useState } from "react";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import { saveFinalCertificateApi } from "../utils/proofMintApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CertificateWithStamp() {
  const certRef = useRef(null);
  const qrRef = useRef(null); 
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const { documentUrl, qrUrl, documentId } = useSelector(
    (state) => state.uploadDocument
  );

  const isImage = documentUrl?.match(/\.(jpeg|jpg|png)$/i);

  const viewUrl =
    !isImage && documentUrl
      ? `https://docs.google.com/gview?url=${encodeURIComponent(
          documentUrl
        )}&embedded=true`
      : null;

  const handleSaveFinal = async () => {
    if (!certRef.current) return;
    setSaving(true);

    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
      });

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      let res = await saveFinalCertificateApi(blob, documentId);

      if (res?.status === true) {
        alert("Certificate saved successfully!");
        navigate("/");
      } else {
        alert("Save failed: Server error");
      }
    } catch (err) {
      console.error("Error saving final cert:", err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div
        ref={certRef}
        className="relative inline-block mt-4"
        style={{ width: "100%", maxWidth: "800px", height: "600px" }}
      >
        {isImage && (
          <img
            src={documentUrl}
            alt="Uploaded Document"
            className="w-full h-full object-contain border rounded"
          />
        )}

        {!isImage && documentUrl && (
          <iframe
            src={viewUrl}
            width="100%"
            height="100%"
            title="Document Preview"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
          />
        )}
        {qrUrl && (
          <Draggable
            nodeRef={qrRef}
            defaultPosition={{ x: 50, y: 50 }}
            bounds="parent"
          >
            <img
              ref={qrRef}
              src={qrUrl}
              alt="qr"
              className="absolute w-24 cursor-move top-0 left-0 z-10"
            />
          </Draggable>
        )}
      </div>

      {documentUrl && qrUrl && (
        <button
          onClick={handleSaveFinal}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition mt-4"
          disabled={saving}
        >
          {saving ? "Saving, please wait..." : "Save with QR"}
        </button>
      )}
    </div>
  );
}
