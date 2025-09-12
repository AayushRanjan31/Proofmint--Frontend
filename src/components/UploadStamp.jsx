import {useRef, useState} from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import {saveFinalCertificateApi} from '../utils/proofMintApi';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Button} from 'antd';
import {PDFDocument} from 'pdf-lib';

const UploadStamp = () => {
  const certRef = useRef(null);
  const qrRef = useRef(null);
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [qrPosition, setQrPosition] = useState({x: 50, y: 50});

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
      if (isImage) {
        const canvas = await html2canvas(certRef.current, {
          scale: 2,
          useCORS: true,
        });

        const blob = await new Promise((resolve) =>
          canvas.toBlob(resolve, 'image/png'),
        );

        const res = await saveFinalCertificateApi(blob, documentId);

        if (res?.status === true) {
          toast.success('Image saved with QR');
          navigate('/');
        } else {
          toast.error('Failed to upload image with QR');
        }
      } else {
        const existingPdfBytes = await fetch(documentUrl).then((res) =>
          res.arrayBuffer(),
        );

        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        const qrBytes = await fetch(qrUrl).then((res) => res.arrayBuffer());
        const qrImage = await pdfDoc.embedPng(qrBytes);

        const page = pdfDoc.getPage(0);
        const {width, height} = page.getSize();
        const container = certRef.current.getBoundingClientRect();
        const qrDomSize = qrRef.current.getBoundingClientRect();
        const qrWidth = 100;
        const qrHeight = 100;
        const scaleX = width / container.width;
        const scaleY = height / container.height;
        const pdfX = qrPosition.x * scaleX;
        const pdfY =
          (container.height - qrPosition.y - qrDomSize.height) * scaleY;

        page.drawImage(qrImage, {
          x: pdfX,
          y: pdfY,
          width: qrWidth,
          height: qrHeight,
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], {type: 'application/pdf'});
        const res = await saveFinalCertificateApi(blob, documentId);

        if (res?.status === true) {
          toast.success('PDF saved with QR');
          navigate('/');
        } else {
          toast.error('Failed to upload PDF with QR');
        }
      }
    } catch (err) {
      console.error('Error saving document with QR:', err);
      toast.error('Save Failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="md:flex md:justify-center md:ml-72 mt-20 md:mt-10">
      <div className="flex flex-col items-center text-center gap-4 m-2">
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
              nodeRef={qrRef}
              defaultPosition={{x: 50, y: 50}}
              bounds="parent"
              onStop={(e, data) => {
                setQrPosition({x: data.x, y: data.y});
              }}
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
    </div>
  );
};

export default UploadStamp;
