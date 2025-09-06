import {useRef} from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import {saveFinalCertificateApi} from '../utils/proofMintApi';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function CertificateWithStamp() {
  const certRef = useRef(null);
  const nodeRef = useRef(null);
  const navigate = useNavigate();

  const {documentUrl, qrUrl} = useSelector((state) => state.uploadDocument);
  const {documentId} = useSelector((state) => state.uploadDocument);
  console.log('Doc URL:', documentUrl, 'QR URL:', qrUrl);

  const isImage = documentUrl?.match(/\.(jpeg|jpg|png)$/i);

  const viewUrl =
    !isImage && documentUrl ?
      `https://docs.google.com/gview?url=${encodeURIComponent(
          documentUrl,
      )}&embedded=true` :
      null;

  const handleSaveFinal = async () => {
    if (!certRef.current) return;

    const canvas = await html2canvas(certRef.current, {scale: 2});
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/png'),
    );

    try {
      const res = await saveFinalCertificateApi(blob, documentId);

      if (res?.status === true) {
        alert('Certificate saved successfully!');
        console.log(res.status);

        // ✅ Navigate only after success
        navigate('/');
      } else {
        alert('Save failed: Server error');
      }
    } catch (err) {
      console.error('Error saving final cert:', err);
      alert('Save failed');
    }
  };

  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div
        ref={certRef}
        className="relative inline-block mt-4"
        style={{width: '100%', maxWidth: '800px', height: '600px'}}
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
            style={{border: '1px solid #ccc', borderRadius: '8px'}}
          />
        )}

        {qrUrl && (
          <Draggable
            nodeRef={nodeRef}
            defaultPosition={{x: 50, y: 50}}
            bounds="parent"
          >
            <img
              ref={nodeRef}
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
          className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition mt-4"
        >
          Save with QR
        </button>
      )}
    </div>
  );
}
