import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RiMore2Fill, RiDeleteBin6Line } from "react-icons/ri";
import { FaBan } from "react-icons/fa";

const AdminDocument = () => {
  // const dispatch = useDispatch();
  const { documents, error } = useSelector((state) => state.documents);
  const [openMenu, setOpenMenu] = useState(null);

  const docsArray = [
    {
      title: "title",
      documentId: "34875928309",
      createdAt: "374triwyfgskh",
      status: "expire",
      expire: "12-20-30",
    },
    {
      title: "title",
      documentId: "34875928309",
      createdAt: "374triwyfgskh",
      status: "stamped",
      expire: "12-20-30",
    },
  ];

  const handleDelete = (id) => {

  };

  const handleRevoke = (id) => {

  };

  return (
    <div className="lg:flex lg:justify-center md:ml-[280px]">
      <div className="m-4 p-5 lg:w-[70vw]">
     
        <div className="flex items-center justify-between mb-4 text-[var(--text-color)]">
          <p className="pb-3 md:text-5xl text-4xl font-bold">All Documents</p>
        </div>

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
              ) : docsArray.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center  text-gray-500">
                    No documents found
                  </td>
                </tr>
              ) : (
                docsArray.map((doc, idx) => (
                  <tr key={idx} className="text-[var(--text-color)]">
                    <td className="p-3 border-b">{doc.title}</td>
                    <td className="p-3 border-b">{doc.documentId}</td>
                    <td className="p-3 border-b">
                      {doc.createdAt.slice(0, 10)}
                    </td>
                    <td className="p-3 border-b">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          doc.status === "stamped"
                            ? "bg-green-100 text-green-700"
                            : doc.status === "uploaded"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="p-3 border-b">{doc.expire}</td>
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
                              onClick={() => handleRevoke(doc.documentId)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[var(--text-color)] hover:bg-gray-100 hover:text-black"
                            >
                              <FaBan size={20} /> Revoke
                            </button>
                            <button
                              onClick={() => handleDelete(doc.documentId)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <RiDeleteBin6Line size={20} /> Delete
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

        <div className="space-y-4 lg:hidden">
          {error ? (
            <h1 className="text-center text-red-500">{error}</h1>
          ) : docsArray.length === 0 ? (
            <h1 className="text-center text-gray-500">No documents found</h1>
          ) : (
            docsArray.map((doc, idx) => (
              <div
                key={idx}
                className="p-4 border rounded-lg shadow-sm bg-gray-50 relative"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{doc.title}</h3>
                    <p className="text-gray-600">
                      Document ID: {doc.documentId}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Issued: {doc.createdAt.slice(0, 10)}
                    </p>
                    <p className="mt-1">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          doc.status === "stamped"
                            ? "bg-green-100 text-green-700"
                            : doc.status === "uploaded"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Expire: {doc.expire}
                    </p>
                  </div>

                  <div className="relative">
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
                          onClick={() => handleRevoke(doc.documentId)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-red-50"
                        >
                          <FaBan size={20} /> Revoke
                        </button>
                        <button
                          onClick={() => handleDelete(doc.documentId)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <RiDeleteBin6Line size={20} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDocument;
