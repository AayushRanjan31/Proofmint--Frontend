import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allFetchDocument } from '../redux/slices/documentSlice';
import { RiMore2Fill } from 'react-icons/ri';


const DocumentsTable = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(null);
  const { documents, error } = useSelector((state) => state.documents);

  useEffect(() => {
    dispatch(allFetchDocument());
  }, [dispatch]);
  const [previewDialog, setPreviewDialog] = useState({
    isOpen: false,
    docUrl: "",
    docTitle: "",
  });
  const handlePreview = (doc) => {
    setPreviewDialog({ isOpen: true, docUrl: doc.preview || doc.fileUrl, docTitle: doc.title });
    setOpenMenu(null);
  };

  const handleGetScanner = (doc) => {
    const link = document.createElement("a");
    link.href = doc.qrCode; // already base64 image from backend
    link.download = `${doc.title}-scanner.png`;
    link.click();
    setOpenMenu(null);
  };
  const handleDownload = async () => {
    if (!previewDialog.docUrl) return;

    try {
      const response = await fetch(previewDialog.docUrl, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;

      // Extract extension if available
      const extension = previewDialog.docUrl.match(/\.(jpg|jpeg|png|pdf)$/i)
        ? previewDialog.docUrl.split(".").pop()
        : "png";

      link.download = `${previewDialog.docTitle || "document"}.${extension}`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };



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
                <th className="p-3 border-b">Action</th>
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
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                          }`}
                      >
                        {doc.status}
                      </span>

                    </td>
                    <td className="p-3 border-b">{doc.createdAt.slice(0, 10)}</td>
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
                          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 shadow-lg rounded-md overflow-hidden z-10">
                            <button

                              onClick={() => handlePreview(doc)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-red-50"

                            >
                              Preview
                            </button>
                            <button
                              onClick={() => handleGetScanner(doc)}
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
          {previewDialog.isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
              <div className="bg-white rounded-xl shadow-lg p-6 w-[80vw] h-[80vh] flex flex-col">
                <h2 className="text-lg font-semibold mb-4">{previewDialog.docTitle}</h2>

                <div className="flex-1 overflow-auto mb-4 flex items-center justify-center">
                  {previewDialog.docUrl.match(/\.(jpg|jpeg|png)$/i) ? (
                    <img
                      src={previewDialog.docUrl}
                      alt={previewDialog.docTitle}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <iframe
                      src={previewDialog.docUrl}
                      title="Document Preview"
                      className="w-full h-full"
                    />
                  )}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => setPreviewDialog({ isOpen: false, docUrl: "", docTitle: "" })}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
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