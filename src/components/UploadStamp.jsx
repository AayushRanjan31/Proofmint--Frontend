import {useRef, useState} from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import {saveFinalCertificateApi} from '../utils/proofMintApi';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Button} from 'antd';

const UploadStamp = () => {
  const certRef = useRef(null);
  const qrRef = useRef(null);
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const {documentUrl, qrUrl, documentId} = useSelector(
      (state) => state.uploadDocument,
  );

  const isImage = documentUrl?.match(/\.(jpeg|jpg|png)$/i);

  const viewUrl =
    !isImage && documentUrl ?
      `https://docs.google.com/gview?url=${encodeURIComponent(
          documentUrl,
      )}&embedded=true` :
      null;

  const handleSaveFinal = async () => {
    if (!certRef.current) return;
    setSaving(true);

    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
      });

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, 'image/png'),
      );

      const res = await saveFinalCertificateApi(blob, documentId);

      if (res?.status === true) {
        toast.success('Certificate saved successfully', {
          toastId: 'certificate-with-stamp',
        });
        navigate('/');
      } else {
        toast.error('Failed to upload with stamp', {
          toastId: 'failed-with-stamp',
        });
      }
    } catch {
      toast.error('Save Failed', {toastId: 'save-failed'});
    } finally {
      setSaving(false);
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
          <Draggable nodeRef={qrRef} defaultPosition={{x: 50, y: 50}} bounds="parent">
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
        <Button
          type="primary"
          onClick={handleSaveFinal}
          loading={saving}
          style={{
            backgroundColor: '#1D4ED8',
            borderColor: '#1D4ED8',
            color: '#ffffff',
            marginTop: '16px',
            padding: '8px 24px',
            borderRadius: '8px',
          }}
        >
          Save with QR
        </Button>
      )}
    </div>
  );
};

export default UploadStamp;
