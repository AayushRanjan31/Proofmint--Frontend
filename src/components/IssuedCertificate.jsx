import { useSelector } from 'react-redux';
import { AiOutlineFileExclamation } from 'react-icons/ai';

const IssuedCertificate = () => {
  const { certificate } = useSelector((state) => state.verifyDocument);

  // Function to check if the certificate URL is an image
const isImage = certificate.previewUrl?.match(/.(jpeg|jpg|png)$/i);

  // Google Docs Viewer URL for non-image files
  const viewUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
    certificate.previewUrl
  )}&embedded=true`;

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 mt-10 p-2">
        <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-xl ml-5 mr-5">
          {certificate ? (
            <div className="flex flex-col items-center mb-6">
{isImage && (
          <img
            src={certificate.previewUrl}
            alt="Uploaded Document"
            className="w-full max-w-full object-contain border rounded"
          />
        )}

        {!isImage && viewUrl && (
          <iframe
            src={viewUrl}
            width="100%"
            height="100%"
            title="Document Preview"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
          />
        )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-4xl font-bold text-gray-800 text-center">
                Invalid Document ID
              </h2>
              <AiOutlineFileExclamation className="h-[200px] w-4xl text-gray-400" />
              <p className="text-gray-700">Please check again</p>
              <button
                type="button"
                className="w-[250px] py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition cursor-pointer"
              >
                Go back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssuedCertificate;