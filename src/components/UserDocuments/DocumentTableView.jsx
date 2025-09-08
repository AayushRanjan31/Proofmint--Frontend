import {RiMore2Fill} from 'react-icons/ri';

const DocumentTableView = ({docsArray, error, openMenu, setOpenMenu, handlePreview,
  handleGetScanner}) => {
  return (
    <div className="hidden overflow-x-auto lg:block">
      <table className="w-full border-collapse mb-20">
        <thead>
          <tr className="text-left bg-[var(--table-bg)] text-[var(--text-color)]">
            <th className="p-3 border-b">Title</th>
            <th className="p-3 border-b">Document ID</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Issued</th>
            <th className="p-3 border-b">Action</th>
          </tr>
        </thead>

        <tbody>
          {error ? (
            <tr>
              <td colSpan="5" className="text-center text-red-500 p-4">
                {error}
              </td>
            </tr>
          ) : docsArray.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 p-4">
                No documents found
              </td>
            </tr>
          ) : (
            docsArray.map((doc, idx) => (
              <tr key={idx} className="text-[var(--text-color)]">
                <td className="p-3 border-b">{doc.title}</td>
                <td className="p-3 border-b">{doc.documentId}</td>
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
                <td className="p-3 border-b">{doc.createdAt.slice(0, 10)}</td>
                <td className="p-3 border-b">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === idx ? null : idx)
                      }
                    >
                      <RiMore2Fill size={18} />
                    </button>


                    {openMenu === idx && (
                      <div className="absolute right-0 mt-2 w-32 bg-[var(--component-bg)] border border-gray-100 shadow-md rounded-md overflow-hidden z-10">
                        <button
                          onClick={() => {
                            handlePreview(doc);
                            setOpenMenu(null);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-red-50"
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => {
                            handleGetScanner(doc);
                            setOpenMenu(null);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Scanner
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

export default DocumentTableView;
