const PreviewDialog = ({isOpen, docUrl, docTitle, onClose, onDownload}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center z-[9999] justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[80vw] h-[80vh] flex flex-col">
        <h2 className="text-lg font-semibold mb-4">{docTitle}</h2>

        <div className="flex-1 overflow-auto mb-4 flex items-center justify-center">
          {docUrl.match(/\.(jpg|jpeg|png)$/i) ? (
            <img
              src={docUrl}
              alt={docTitle}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <iframe
              src={docUrl}
              title="Document Preview"
              className="w-full h-full"
            />
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onDownload}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Download
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewDialog;
