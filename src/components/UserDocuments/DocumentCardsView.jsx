const DocumentCardsView = ({docsArray, error, handlePreview, handleGetScanner}) => {
  return (
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
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Issued: {doc.createdAt.slice(0, 10)}
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handlePreview(doc)}
                className="flex-1 px-3 py-2 text-sm rounded-md border text-blue-600 hover:bg-blue-50"
              >
                Preview
              </button>
              <button
                onClick={() => handleGetScanner(doc)}
                className="flex-1 px-3 py-2 text-sm rounded-md border text-red-600 hover:bg-red-50"
              >
                Scanner
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DocumentCardsView;
