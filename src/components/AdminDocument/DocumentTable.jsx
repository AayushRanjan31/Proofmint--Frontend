import {RiMore2Fill, RiDeleteBin6Line} from 'react-icons/ri';
import {FaBan} from 'react-icons/fa';

const DocumentTable = ({documents, error, openMenu, setOpenMenu, onRevoke, onDeleteClick}) => {
  return (
    <div className="hidden overflow-x-auto lg:block">
      <table className="w-full border-collapse mb-20">
        <thead>
          <tr className="text-left bg-[var(--table-bg)] text-[var(--text-color)]">
            <th className="p-3 border-b">Title</th>
            <th className="p-3 border-b">Document ID</th>
            <th className="p-3 border-b">Issued</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Expire</th>
            <th className="p-3 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td colSpan="6" className="text-center text-red-500 p-4">
                {error}
              </td>
            </tr>
          ) : documents?.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 p-4">
                No documents found
              </td>
            </tr>
          ) : (
            documents?.map((doc, idx) => (
              <tr key={idx} className="text-[var(--text-color)]">
                <td className="p-3 border-b">{doc.title}</td>
                <td className="p-3 border-b">{doc.certificateId}</td>
                <td className="p-3 border-b">{doc.issuer}</td>
                <td className="p-3 border-b">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      doc.status === 'stamped' ?
                        'bg-green-100 text-green-700' :
                        doc.status === 'uploaded' ?
                        'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                    }`}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="p-3 border-b">{doc.expiry?.slice(0, 10)}</td>
                <td className="p-3 border-b">
                  <div className="relative inline-block">
                    <button
                      onClick={() => setOpenMenu(openMenu === idx ? null : idx)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <RiMore2Fill size={18} />
                    </button>
                    {openMenu === idx && (
                      <div className="absolute right-0 mt-2 w-32 bg-[var(--component-bg)] border border-gray-100 shadow-lg rounded-md overflow-hidden z-10">
                        <button
                          onClick={() => onRevoke(doc.certificateId
                              , doc.title)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-red-50"
                        >
                          <FaBan size={16} /> Revoke
                        </button>
                        <button
                          onClick={() => onDeleteClick(doc.certificateId
                              , doc.title)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <RiDeleteBin6Line size={16} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;
