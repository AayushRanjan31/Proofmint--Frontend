import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {allFetchDocument} from '../redux/slices/documentSlice';

const DocumentsTable = () => {
  const dispatch = useDispatch();
  const {documents} = useSelector((state) => state.documents);
  const documentss=[]
  useEffect(() => {
    dispatch(allFetchDocument());
  }, [dispatch]);


  return (
    <div className='lg:flex lg:justify-center md:ml-[280px] mt-10'>
      <div className="m-8 shadow rounded-lg p-5 bg-[var(--component-bg)]  lg:w-[70vw]">
        <div className="flex items-center justify-between mb-4 text-[var(--text-color)]">
          <h2 className="pb-1 font-semibold ">Documents</h2>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-3 border-b">Title</th>
                <th className="p-3 border-b">Document ID</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Issued</th>
              </tr>
            </thead>
            <tbody>
              {documents?.map((doc, idx) => (
                <tr key={idx} className="text-[var(--text-color)]">
                  <td className="p-3 border-b">{doc.title}</td>
                  <td className="p-3 border-b">{doc.documentId}</td>
                  <td className="p-3 border-b">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      doc.status === 'Issued' ?
                        'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="p-3 border-b">{doc.issuedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 lg:hidden">
          {documents?.map((doc, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <h3 className="text-lg font-semibold">{doc.title}</h3>
              <p className="text-gray-600">Document ID: {doc.documentId}</p>
              <p className="mt-1">
                <span
                  className={`px-2 py-1 rounded-lg text-sm font-medium ${
                  doc.status === 'Issued' ?
                    'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}
                >
                  {doc.status}
                </span>
              </p>
              <p className="mt-1 text-sm text-gray-500">
              Issued: {doc.issuedAt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentsTable;


