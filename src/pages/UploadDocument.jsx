import {FiUploadCloud} from 'react-icons/fi';
import {useDispatch, useSelector} from 'react-redux';
import {uploadDocument, setFile, setFilePath, setDocumentUrl, setQrUrl, setDocumentId, setTitle, setExpiryDate} from '../redux/slices/uploadDocument';
import { useNavigate } from 'react-router-dom';

const UploadDocument = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { file, title, expiryDate, loading } = useSelector((state) => state.uploadDocument);
  const user = localStorage.getItem("userName");
  const MAX_FILE_SIZE = 15 * 1024 * 1024;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    validateFile(droppedFile);
  };

  const handleDragOver = (e) => e.preventDefault();

  const validateFile = (selectedFile) => {
    if (!selectedFile) return;
    if (selectedFile.size > MAX_FILE_SIZE) {
      alert('File size must be less than 15MB!');
      dispatch(setFile(null));
      return;
    }
    dispatch(setFile(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please upload a file first!');
      return;
    }

    const res = await dispatch(
      uploadDocument({
        file: file,
        title: title,
        expiry: expiryDate,
        username: user,
      })
    );

    const filePath = URL.createObjectURL(file);
    dispatch(setFilePath(filePath));

    if (res.payload?.status === true) {
      dispatch(setDocumentUrl(res.payload.imageData.url));
      dispatch(setQrUrl(res.payload.imageData.qrCode));
      dispatch(setDocumentId(res.payload.imageData.certificateId));
      navigate("/stamp");
    }
  };

  return (
    <div className='md:flex md:justify-center md:ml-70 mt-20 md:mt-10'>
      <div className="shadow m-8 flex flex-col p-5 rounded-xl gap-3 bg-[var(--component-bg)] text-[var(--text-color)] md:w-[50vw]">
        <h1 className="font-semibold pb-1">Upload Document</h1>
        <div
          className="border-2 border-dashed border-gray-300 p-8 rounded-xl flex flex-col items-center gap-3"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <FiUploadCloud size={60} className="text-gray-500" />
          <p className="text-gray-500">Drag and drop file or</p>
          <label
            htmlFor="fileInput"
            className="px-6 py-2 bg-[var(--btn-color)] rounded-md cursor-pointer hover:bg-gray-200"
          >
            Browse File
          </label>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />
          {file && file.name && (
            <p className="text-sm text-green-600 mt-2">
              Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
            </p>
          )}
        </div>

        <div className="flex gap-4 w-full justify-center">
          <input
            type="text"
            onChange={(e) => dispatch(setTitle(e.target.value))}
            className="w-[50%] px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            placeholder="Please enter title"
          />
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => dispatch(setExpiryDate(e.target.value))}
            className="w-[50%] px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
        </div>

        <button
          className="py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg cursor-pointer"
          onClick={handleUpload}
          disabled={loading}  
        >
          {loading ? 'Uploading please wait....' : 'Upload File'}
        </button>
      </div>
    </div>
  );
};

export default UploadDocument;

