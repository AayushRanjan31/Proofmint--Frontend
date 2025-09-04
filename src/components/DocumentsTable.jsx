const DocumentsTable = () => {
  const documents = [
    {
      title: "Certificate of Completion",
      documentId: "4y589y24582y5",
      status: "Issued",
      issuedAt: "2024-04-24",
    },
    {
      title: "Employee ID",
      documentId: "32526450",
      status: "Revoked",
      issuedAt: "2024-04-20",
    },
  ];
  
  return (
    <div className="m-8 shadow rounded-lg p-5 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold pb-1">Documents</h2>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">Title</th>
              <th className="p-3 border-b">Document ID</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Issued</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-3 border-b">{doc.title}</td>
                <td className="p-3 border-b">{doc.documentId}</td>
                <td className="p-3 border-b">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      doc.status === "Issued"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
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

      <div className="md:hidden space-y-4">
        {documents.map((doc, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <h3 className="font-semibold text-lg">{doc.title}</h3>
            <p className="text-gray-600">Document ID: {doc.documentId}</p>
            <p className="mt-1">
              <span
                className={`px-2 py-1 rounded-lg text-sm font-medium ${
                  doc.status === "Issued"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {doc.status}
              </span>
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Issued: {doc.issuedAt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsTable;


