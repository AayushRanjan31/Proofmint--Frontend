import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RiMore2Fill, RiDeleteBin6Line} from 'react-icons/ri';
import {fetchAllUser, removeUser} from '../redux/slices/adminSlice';
import {toast} from 'react-toastify';


const ManageUser = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    userId: null,
    userName: '',
  });

  const dispatch = useDispatch();
  const {userData, error} = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  const handleDeleteClick = (id, name) => {
    setConfirmDialog({
      isOpen: true,
      userId: id,
      userName: name,
    });
  };
  const handleConfirmDelete = () => {
    dispatch(removeUser(confirmDialog.userId))
        .unwrap()
        .then(() => {
          toast.success(`User ${confirmDialog.userName} deleted successfully`);
          setConfirmDialog({isOpen: false, userId: null, userName: ''}); // ✅ closes dialog
        })
        .catch(() => {
          toast.error('Failed to delete user');
          setConfirmDialog({isOpen: false, userId: null, userName: ''}); // ✅ still closes
        });
  };

  const handleCancelDelete = () => {
    setConfirmDialog({isOpen: false, userId: null, userName: ''});
    setOpenMenu(null);
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
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {userData?.map((data) => (
                <tr key={data.id} className="hover:bg-gray-50 transition">
                  <td className="p-3">{data.id}</td>
                  <td className="p-3 font-medium text-gray-900">{data.firstName}</td>
                  <td className="p-3 text-gray-600">{data.email}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
                      {data.role}
                    </span>
                  </td>
                  <td className="p-3 text-center relative">
                    <div className="inline-block">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === data.id ? null : data.id)
                        }
                        className=" rounded-full hover:bg-gray-100"
                      >
                        <RiMore2Fill size={18} />
                      </button>
                      {openMenu === data.id && (
                        <div className="absolute right-0 mt-0 w-30 bg-white border border-gray-100 shadow-lg rounded-md overflow-hidden ">
                          <button
                            onClick={() => handleDeleteClick(data.id, data.firstName)}
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
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Delete User
            </h2>
            <p className="text-sm text-gray-600 mb-6">
        Do you really want to delete{' '}
              <span className="font-medium text-red-600">
                {confirmDialog.userName}
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

export default ManageUser;
