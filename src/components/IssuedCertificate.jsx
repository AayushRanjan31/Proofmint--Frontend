import {useSelector} from 'react-redux';
import {AiOutlineFileExclamation} from 'react-icons/ai';

const IssuedCertificate = () => {
  const {certificate} = useSelector((state) => state.verifyDocument);

  // Handle empty certificate or missing previewUrl
  if (!certificate?.previewUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <AiOutlineFileExclamation className="text-4xl mb-2" />
        <p>No certificate preview available</p>
      </div>
    );
  }

  // Check if the file is an image (support query params too)
  const isImage = /\.(jpeg|jpg|png)(\?.*)?$/i.test(certificate.previewUrl);

  // Google Docs Viewer URL only for non-image docs
  const viewUrl = !isImage ?
    `https://docs.google.com/gview?url=${encodeURIComponent(
        certificate.previewUrl,
    )}&embedded=true` :
    null;

  return (
    <div className="flex items-center justify-center bg-gray-50 mt-10 p-2">
      <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-xl ml-5 mr-5">
        <p className="mb-4 text-gray-600 text-sm">{certificate.stamped}</p>

        <div className="flex flex-col items-center mb-6 w-full">
          {isImage ? (
            <img
              src={certificate.previewUrl}
              alt="Uploaded Document"
              className="w-full max-w-full object-contain border rounded"
            />
          ) : (
            <iframe
              src={viewUrl}
              width="100%"
              height="600"
              title="Document Preview"
              className="border rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default IssuedCertificate;
