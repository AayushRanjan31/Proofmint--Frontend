import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {RiMore2Fill, RiDeleteBin6Line} from 'react-icons/ri';
import {FaBan} from 'react-icons/fa';
import {
  allFetchDocument,
  removeDocument,
  revokeDocument,
} from '../redux/slices/documentSlice';
import {toast} from 'react-toastify';

const AdminDocument = () => {
  const dispatch = useDispatch();
  const {documents, error} = useSelector((state) => state.documents);
  const [openMenu, setOpenMenu] = useState(null);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    docId: null,
    docTitle: '',
  });

  useEffect(() => {
    dispatch(allFetchDocument());
  }, [dispatch]);

  const handleDeleteClick = (docId, title) => {
    setConfirmDialog({
      isOpen: true,
      docId,
      docTitle: title,
    });
    setOpenMenu(null);
  };

  const handleCancelDelete = () => {
    setConfirmDialog({isOpen: false, docId: null, docTitle: ''});
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(removeDocument(confirmDialog.docId)).unwrap();
      toast.success(`Document "${confirmDialog.docTitle}" deleted successfully`);
      setConfirmDialog({isOpen: false, docId: null, docTitle: ''});
      dispatch(allFetchDocument());
    } catch (err) {
      toast.error('Failed to delete document');
      setConfirmDialog({isOpen: false, docId: null, docTitle: ''});
    }
  };

  const handleRevoke = async (docId, title) => {
    try {
      await dispatch(revokeDocument(docId)).unwrap();
      toast.success(`Document "${title}" revoked successfully`);
      dispatch(allFetchDocument());
      setOpenMenu(null);
    } catch (err) {
      toast.error('Failed to revoke document');
    }
  };

  return (
    <div className="lg:flex lg:justify-center md:ml-[280px]">
      <div className="m-4 p-5 lg:w-[70vw]">
        <div className="flex items-center justify-between mb-4 text-[var(--text-color)]">
          <p className="pb-3 md:text-5xl text-4xl font-bold">All Documents</p>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse">
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
                    <td className="p-3 border-b">{doc.documentId}</td>
                    <td className="p-3 border-b">
                      {doc.createdAt?.slice(0, 10)}
                    </td>
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
                          onClick={() =>
                            setOpenMenu(openMenu === idx ? null : idx)
                          }
                          className="p-2 rounded-full hover:bg-gray-100"
                        >
                          <RiMore2Fill size={18} />
                        </button>
                        {openMenu === idx && (
                          <div className="absolute right-0 mt-2 w-32 bg-[var(--component-bg)] border border-gray-100 shadow-lg rounded-md overflow-hidden z-10">
                            <button
                              onClick={() => handleRevoke(doc.id, doc.title)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-red-50"
                            >
                              <FaBan size={16} /> Revoke
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteClick(doc.id, doc.title)
                              }
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

        {/* Mobile Cards */}
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
                <span className="font-medium">ID:</span> {doc.documentId}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Issued:</span>{' '}
                {doc.createdAt?.slice(0, 10)}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-medium">Expire:</span>{' '}
                {doc.expiry?.slice(0, 10)}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleRevoke(doc.id, doc.title)}
                  className="flex-1 px-3 py-2 text-sm rounded-md border text-yellow-600 hover:bg-yellow-50 flex items-center justify-center gap-1"
                >
                  <FaBan size={14} /> Revoke
                </button>
                <button
                  onClick={() => handleDeleteClick(doc.id, doc.title)}
                  className="flex-1 px-3 py-2 text-sm rounded-md border text-red-600 hover:bg-red-50 flex items-center justify-center gap-1"
                >
                  <RiDeleteBin6Line size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Delete Dialog */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Delete Document
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Do you really want to delete{' '}
              <span className="font-medium text-red-600">
                {confirmDialog.docTitle}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDocument;
