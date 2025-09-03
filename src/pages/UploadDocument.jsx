import {useState} from 'react';
import {FiUploadCloud} from 'react-icons/fi';
import { setFilePath } from '../redux/slices/uploadDocument';
import { useDispatch } from 'react-redux';

const UploadDocument = () => {
  const [file, setFile] = useState(null);
    const dispatch = useDispatch();

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
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const validateFile = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      alert('File size must be less than 15MB!');
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };


  const handleUpload = (e) => {
    if (file) {
      const filePath = URL.createObjectURL(file);
          dispatch(setFilePath(filePath));
    } else {
      alert('Please upload a file first!');
    }
  };

  return (
    <div className="shadow m-8 flex flex-col p-5 rounded-xl gap-5 bg-white md:ml-70">
      <h1 className="text-6xl font-semibold pb-1">Upload Document</h1>
      <div className="border-2 border-dashed border-gray-300 p-8 rounded-xl flex flex-col items-center gap-4 bg-white" onDrop={handleDrop} onDragOver={handleDragOver}>
        <FiUploadCloud size={60} className="text-gray-500" />
        <p className="text-gray-500">Drag and drop file or</p>
        <label htmlFor="fileInput" className="px-6 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"> Browse File </label>
        <input type="file" id="fileInput" className="hidden" onChange={handleFileChange}/>
        {file && (
          <p className="text-sm text-green-600 mt-2">
            Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
          </p>
        )}
      </div>
      <button className="py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg cursor-pointer" onClick={handleUpload}>
              {file ? 'Stamp' : 'Upload'}  
      </button>
    </div>
  );
};

export default UploadDocument;
