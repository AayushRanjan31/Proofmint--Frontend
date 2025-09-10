import {MdOutlineQrCodeScanner} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import {
  setDocumentId,
  getCerificate,
  clearCertificate,
} from '../redux/slices/verifyDocument';
import IssuedCertificate from '../components/IssuedCertificate';
import {useState, useRef, useEffect} from 'react';
import {BrowserMultiFormatReader} from '@zxing/browser';
import {toast} from 'react-toastify';
import {Input, Button} from 'antd';

const VerifyDocument = () => {
  const dispatch = useDispatch();
  const {documentId, certificate} = useSelector(
      (state) => state.verifyDocument,
  );

  const [scanning, setScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const videoRef = useRef(null);
  const scanSubscriptionRef = useRef(null);

  const startScan = async () => {
    setScanning(true);
    setErrorMessage('');
    dispatch(clearCertificate());
    dispatch(setDocumentId(''));

    const codeReader = new BrowserMultiFormatReader();

    scanSubscriptionRef.current = await codeReader.decodeFromVideoDevice(
        null,
        videoRef.current,
        (result) => {
          if (result) {
            const scannedText = result.getText();

            try {
              const url = new URL(scannedText);
              const docId = url.searchParams.get('docId');

              if (docId) {
                setErrorMessage('');
                dispatch(clearCertificate());
                dispatch(setDocumentId(docId));
                dispatch(getCerificate(docId))
                    .unwrap()
                    .then(() => {
                      toast.success('Certificate fetched successfully');
                      stopScan();
                    })
                    .catch((err) => {
                      setErrorMessage('Failed to fetch certificate');
                      toast.error(err?.message || 'Failed to fetch certificate');
                    });
              } else {
                setErrorMessage('Document not found. Try again.');
                dispatch(clearCertificate());
                dispatch(setDocumentId(''));
              }
            } catch {
              setErrorMessage('Invalid QR code. Please scan a valid one.');
              dispatch(clearCertificate());
            }
          }
        },
    );
  };

  const stopScan = () => {
    if (scanSubscriptionRef.current) {
      scanSubscriptionRef.current.stop();
      scanSubscriptionRef.current = null;
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => stopScan();
  }, []);

  const handleVerifyClick = () => {
    if (!documentId.trim()) {
      setErrorMessage('Please enter a Document ID');
      return;
    }
    dispatch(clearCertificate());
    dispatch(getCerificate(documentId.trim()))
        .unwrap()
        .then(() => {
          toast.success('Certificate fetched successfully');
          setErrorMessage('');
        })
        .catch((err) => {
          setErrorMessage('Failed to fetch certificate');
          toast.error(err?.message || 'Failed to fetch certificate');
        });
  };

  useEffect(() => {
    return () => {
      dispatch(clearCertificate());
      dispatch(setDocumentId(''));
    };
  }, [dispatch]);

  return (
    <div className="min-h-[81vh] flex justify-center items-start pt-10 mx-2">
      <div className="shadow flex flex-col p-5 rounded-xl gap-3 bg-white md:w-[40vw]">
        <p className="pb-4 md:text-5xl text-4xl font-bold">Verify Document</p>
        <p className="text-gray-500 text-sm">
          Enter your Document ID or scan the QR code to verify.
        </p>

        <div
          className={`flex justify-center mb-3 ${
            scanning ? 'block' : 'hidden'
          }`}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{
              width: '100%',
              maxWidth: '400px',
              borderRadius: '8px',
              border: '2px solid #4A90E2',
            }}
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}

        {scanning && (
          <Button
            type="primary"
            danger
            className="mb-3"
            onClick={stopScan}
          >
            Stop Scan
          </Button>
        )}

        <Input
          placeholder="Document ID"
          size="large"
          value={documentId}
          onChange={(e) => dispatch(setDocumentId(e.target.value))}
        />

        <Button
          type="primary"
          block
          className="mb-3"
          onClick={handleVerifyClick}
        >
          Verify
        </Button>

        {!scanning && (
          <Button
            block
            className="flex justify-center gap-3 items-center"
            onClick={startScan}
            icon={<MdOutlineQrCodeScanner size={20} />}
          >
            Scan QR Code
          </Button>
        )}

        {certificate && !errorMessage && <IssuedCertificate />}
      </div>
    </div>
  );
};

export default VerifyDocument;
