import {FiUploadCloud} from 'react-icons/fi';
import {useDispatch, useSelector} from 'react-redux';
import {uploadDocument, setFile, setFilePath, setDocumentUrl, setQrUrl, setDocumentId, setTitle, setExpiryDate} from '../redux/slices/uploadDocument';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Input, DatePicker, Button} from 'antd';
import dayjs from 'dayjs';

const UploadDocument = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {file, title, expiryDate, loading} = useSelector((state) => state.uploadDocument);
  const user = localStorage.getItem('userName');
  const MAX_FILE_SIZE = 15 * 1024 * 1024;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateFile(selectedFile);
    e.target.value = null;
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
      toast.error('File size should be less than 15MB');
      dispatch(setFile(null));
      return;
    }
    dispatch(setFile(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return;

    const res = await dispatch(
        uploadDocument({
          file: file,
          title: title,
          expiry: expiryDate,
          username: user,
        }),
    );

    const filePath = URL.createObjectURL(file);
    dispatch(setFilePath(filePath));

    if (res.payload?.status === true) {
      dispatch(setDocumentUrl(res.payload.imageData.url));
      dispatch(setQrUrl(res.payload.imageData.qrCode));
      dispatch(setDocumentId(res.payload.imageData.certificateId));
      navigate('/stamp');
    }
  };

  return (
    <div className="md:flex md:justify-center md:ml-70 mt-20 md:mt-20">
      <div className="shadow m-2 flex flex-col p-5 rounded-xl gap-3 bg-[var(--component-bg)] text-[var(--text-color)] md:w-[50vw]">
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
        <div className="flex gap-6 w-full justify-center mt-4">
          <div className="flex flex-col gap-2 w-[60%]">
            <label htmlFor="title" className="font-medium">Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => dispatch(setTitle(e.target.value))}
              placeholder="Please enter title"
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-2 w-[40%]">
            <label htmlFor="expiryDate" className="font-medium">Expire Date</label>
            <DatePicker
              id="expiryDate"
              value={expiryDate ? dayjs(expiryDate) : null}
              onChange={(date, dateString) => dispatch(setExpiryDate(dateString))}
              disabledDate={(current) => current && current < dayjs().startOf('day')}
              className="w-full"
            />
          </div>
        </div>

        <Button
          type="primary"
          onClick={handleUpload}
          loading={loading}
          style={{color: 'var(--text-color)'}}
          disabled={!file || !title || !expiryDate}
          className="mt-4"
        >
          Upload File
        </Button>
      </div>
    </div>
  );
};

export default UploadDocument;
