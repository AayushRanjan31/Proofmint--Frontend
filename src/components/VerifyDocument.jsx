import {MdOutlineQrCodeScanner} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import {setDocumentId} from '../redux/slices/verifyDocument';
import IssuedCertificate from './IssuedCertificate';
import {getCerificate} from '../redux/slices/verifyDocument';

const VerifyDocument = () => {
  const dispatch = useDispatch();
  const {documentId, certificate} = useSelector((state) => state.verifyDocument);
  const handleGetCertificate=()=>{
    dispatch(getCerificate(documentId));
  };
  return (
    <div className='min-h-[81vh]'>
      <div className='md:flex md:justify-center'>
        <div className="shadow m-8 flex flex-col p-5 rounded-xl gap-2 bg-[var(--component-bg)] text-[var(--text-color)] md:w-[40vw] mt-20">
          <p className="pb-3 md:text-5xl text-4xl font-bold">Verify Document</p>
          <p className="text-gray-500 text-sm">
          Enter your Document ID or scan the QR code to verify.
          </p>
          <input
            type="text"
            placeholder="Document ID"
            className="border border-gray-300 p-2 text-lg rounded-md mb-3"
            value={documentId}
            onChange={(e) => dispatch(setDocumentId(e.target.value))}
          />
          <button
            className="py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg cursor-pointer"
            onClick={() =>handleGetCertificate()}
          >
                Verify
          </button>
          <div className="flex items-center my-3">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <button className="flex justify-center gap-3 items-center px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600 cursor-pointer">
            <MdOutlineQrCodeScanner size={20} />
            <span>Scan QR Code</span>
          </button>
          {
            certificate && <IssuedCertificate/>
          }

        </div>
      </div>
    </div>
  );
};

export default VerifyDocument;
