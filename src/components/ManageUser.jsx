import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiMore2Fill, RiDeleteBin6Line } from "react-icons/ri";
import { fetchAllUser } from "../redux/slices/adminSlice";

const ManageUser = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const dispatch = useDispatch();
  const { userData, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  const handleDelete = (id) => {
    
  };

  return (
    <div className="lg:flex lg:justify-center md:ml-[280px] mt-10">
      <div className="m-8 shadow-sm rounded-xl p-6 bg-white lg:w-[70vw] border border-gray-200">

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="text-left bg-[var(--table-bg)] text-[var(--text-color)] text-xs uppercase tracking-wide">
                <th className="p-3">Id</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Created At</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {userData?.map((data) => (
                <tr key={data.id} className="hover:bg-gray-50 transition">
                  <td className="p-3">{data.id}</td>
                  <td className="p-3 font-medium text-gray-900">{data.name}</td>
                  <td className="p-3 text-gray-600">{data.email}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
                      {data.role}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500">{data.createdAt || data.createdby}</td>
                  <td className="p-3 text-right relative">
                    <div className="inline-block">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === data.id ? null : data.id)
                        }
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <RiMore2Fill size={18} />
                      </button>
                      {openMenu === data.id && (
                        <div className="absolute right-0 mt-0 w-30 bg-white border border-gray-100 shadow-lg rounded-md overflow-hidden ">
                          <button
                            onClick={() => handleDelete(data.id)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <RiDeleteBin6Line /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 lg:hidden">
          {userData.map((data) => (
            <div
              key={data.id}
              className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">{data.name}</h3>
                <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                  {data.role}
                </span>
              </div>
              <p className="text-sm text-gray-600">{data.email}</p>
              <p className="text-xs text-gray-500 mt-1">
                Created: {data.createdAt || data.createdby}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleDelete(data.id)}
                  className="flex-1 px-3 py-2 text-sm rounded-md border text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ManageUser;
