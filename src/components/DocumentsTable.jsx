import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {allFetchDocument} from '../redux/slices/documentSlice';

const DocumentsTable = () => {
  const dispatch = useDispatch();
  const {documents, error} = useSelector((state) => state.documents);

  useEffect(() => {
    dispatch(allFetchDocument());
  }, [dispatch]);

  const docsArray = Array.isArray(documents) ? documents : [];

  return (
    <div className="lg:flex lg:justify-center md:ml-[280px]">
      <div className="m-4 p-5 lg:w-[70vw]">
        <div className="flex items-center justify-between mb-4 text-[var(--text-color)]">
          <p className="pb-3 md:text-5xl text-4xl font-bold">Documents</p>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-[var(--table-bg)] text-[var(--text-color)]">
                <th className="p-3 border-b">Title</th>
                <th className="p-3 border-b">Document ID</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Issued</th>
              </tr>
            </thead>

            <tbody>
              {error ? (
                <tr>
                  <td colSpan="4" className="text-center text-red-500 p-4">
                    {error}
                  </td>
                </tr>
              ) : docsArray.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 p-4">
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
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${doc.status === 'stamped'
                            ? 'bg-green-100 text-green-700'
                            : doc.status === 'uploaded'
                              ? 'bg-red-100 text-blue-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                      >
                        {doc.status}
                      </span>

                    </td>
                    <td className="p-3 border-b">{doc.createdAt.slice(0, 10)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>


        <div className="space-y-4 lg:hidden">
          {error ? (
            <h1 className="text-center text-red-500">{error}</h1>
          ) : docsArray.length === 0 ? (
            <h1 className="text-center text-gray-500">No documents found</h1>
          ) : (
            docsArray.map((doc, idx) => (
              <div
                key={idx}
                className="p-4 border rounded-lg shadow-sm bg-gray-50"
              >
                <h3 className="text-lg font-semibold">{doc.title}</h3>
                <p className="text-gray-600">Document ID: {doc.documentId}</p>
                <p className="mt-1">
                   <span
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${doc.status === 'stamped'
                            ? 'bg-green-100 text-green-700'
                            : doc.status === 'uploaded'
                              ? 'bg-red-100 text-blue-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                      >
                        {doc.status}
                      </span>
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Issued: {doc.createdAt.slice(0, 10)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentsTable;