import {RiDeleteBin6Line} from 'react-icons/ri';
import {FaBan} from 'react-icons/fa';

const DocumentCards = ({documents, onRevoke, onDeleteClick}) => {
  return (
    <div className="space-y-4 lg:hidden">
      {documents?.map((doc) => (
        <div
          key={doc.id}
          className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-900">{doc.title}</h3>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                doc.status === 'stamped' ?
                  'bg-green-100 text-green-700' :
                  doc.status === 'uploaded' ?
                  'bg-blue-100 text-blue-700' :
                  'bg-red-100 text-red-700'
              }`}
            >
              {doc.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">ID:</span> {doc.certificateId}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Issued:</span>{' '}
            {doc.issuer}
          </p>
          <p className="text-sm text-gray-600 mb-3">
            <span className="font-medium">Expire:</span>{' '}
            {doc.expiry?.slice(0, 10)}
          </p>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onRevoke(doc.certificateId, doc.title)}
              className="flex-1 px-3 py-2 text-sm rounded-md border text-yellow-600 hover:bg-yellow-50 flex items-center justify-center gap-1"
            >
              <FaBan size={14} /> Revoke
            </button>
            <button
              onClick={() => onDeleteClick(doc.certificateId, doc.title)}
              className="flex-1 px-3 py-2 text-sm rounded-md border text-red-600 hover:bg-red-50 flex items-center justify-center gap-1"
            >
              <RiDeleteBin6Line size={14} /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentCards;
