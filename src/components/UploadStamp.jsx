import {useRef, useState} from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import {getCertificateWithQrApi, saveFinalCertificateApi} from '../utils/proofMintApi';

export default function CertificateWithStamp() {
  const certRef = useRef(null);
  const nodeRef = useRef(null);

  const [certificateUrl, setCertificateUrl] = useState(null);
  const [qrUrl, setQrUrl] = useState(null);

  const handleGetFromBackend = async () => {
    try {
      const data = await getCertificateWithQrApi();
      setCertificateUrl(data.certificateUrl);
      setQrUrl(data.qrUrl);
    } catch (err) {
      console.error('Error fetching certificate + QR:', err);
      alert('Fetching failed');
    }
  };

  const handleSaveFinal = async () => {
    if (!certRef.current) return;

    const canvas = await html2canvas(certRef.current, {scale: 2});
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/png'),
    );

    try {
      await saveFinalCertificateApi(blob);
    } catch (err) {
      console.error('Error saving final cert:', err);
      alert('Save failed');
    }
  };

  return (
    <div className="flex flex-col items-center text-center gap-4">

      <button
        onClick={handleGetFromBackend}
        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
      >
        Get Certificate + QR
      </button>

      <div ref={certRef} className="relative inline-block mt-4">
        {certificateUrl && (
          <img
            src={certificateUrl}
            alt="certificate"
            className="block max-w-full"
          />
        )}

        {qrUrl && (
          <Draggable nodeRef={nodeRef} defaultPosition={{x: 50, y: 50}}>
            <img
              ref={nodeRef}
              src={qrUrl}
              alt="qr"
              className="absolute w-24 cursor-move top-0 left-0"
            />
          </Draggable>
        )}
      </div>

      {certificateUrl && qrUrl && (
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
