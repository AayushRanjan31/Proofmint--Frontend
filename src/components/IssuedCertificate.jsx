import {useSelector} from 'react-redux';
import {Tag} from 'antd';

const IssuedCertificate = () => {
  const {certificate} = useSelector((state) => state.verifyDocument);

  const getStatusTag = (status) => {
    if (status === 'stamped') {
      return <Tag color="green">Stamped</Tag>;
    }
    return <Tag color="red">Expired</Tag>;
  };

  const isImage = /\.(jpeg|jpg|png|webp)(\?.*)?$/i.test(certificate.previewUrl);
  const isPdf = /\.pdf(\?.*)?$/i.test(certificate.previewUrl);

  const viewUrl = !isImage && !isPdf ?
    `https://docs.google.com/gview?url=${encodeURIComponent(certificate.previewUrl)}&embedded=true` :
    null;

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 mt-10 p-2">
      <p className="mb-4 p-2 text-gray-600 text-md text-left self-start">
        Status: {getStatusTag(certificate.verify)}
      </p>

      <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-xl ml-5 mr-5">
        <div className="flex flex-col items-center mb-6 w-full">
          {isImage ? (
            <img
              src={certificate.previewUrl.replace('http://', 'https://')}
              alt="Uploaded Document"
              className="w-full max-w-full object-contain border rounded"
            />
          ) : isPdf ? (
            <iframe
              src={certificate.previewUrl.replace('http://', 'https://')}
              width="100%"
              height="600"
              title="PDF Preview"
              className="border rounded-lg"
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
