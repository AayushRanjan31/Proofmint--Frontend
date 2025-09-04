import {MdOutlineQrCodeScanner} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import {setDocumentId, setVerified} from '../redux/slices/verifyDocument';

const VerifyDocument = () => {
  const dispatch = useDispatch();
  const {documentId} = useSelector((state) => state.verifyDocument);

  return (
    <div className="shadow m-8 flex flex-col p-5 rounded-xl gap-4 bg-white">
      <h1 className="text-6xl font-semibold pb-1">Verify Document</h1>
      <input
        type="text"
        placeholder="Document ID"
        className="border border-gray-300 p-2 text-lg rounded-md mb-3"
        value={documentId}
        onChange={(e) => dispatch(setDocumentId(e.target.value))}
      />
      <button
        className="py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg cursor-pointer mb-4"
        onClick={() => dispatch(setVerified())}
      >
                Verify
      </button>
      <button className="flex justify-center gap-3 items-center px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 cursor-pointer">
        <MdOutlineQrCodeScanner size={20} />
        <span>Scan QR Code</span>
      </button>
    </div>
  );
};

export default VerifyDocument;
