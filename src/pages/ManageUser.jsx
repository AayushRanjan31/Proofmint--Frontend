import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUser, removeUser } from '../redux/slices/adminSlice';
import { toast } from 'react-toastify';
import { Button, Modal, Tag } from 'antd';
import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const ManageUser = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  const handleDeleteClick = (id, name) => {
    confirm({
      title: `Do you really want to delete ${name}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        dispatch(removeUser(id))
          .unwrap()
          .then(() => {
            toast.success(`User ${name} deleted successfully`, { toastId: 'delete' });
          })
          .catch(() => {
            toast.error('Failed to delete user', { toastId: 'deleted' });
          });
      },
    });
  };

  return (
    <div className="lg:flex lg:justify-center md:ml-[280px] mt-10">
      <div className="m-8 shadow-sm rounded-xl p-6 bg-white lg:w-[70vw] border border-gray-200">

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-sm text-gray-700 mb-4">
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
                    <Tag color={data.role === 'admin' ? 'blue' : 'green'}>{data.role}</Tag>
                  </td>
                  <td className="p-3 text-center relative">
                    <div className="inline-block">
                      <Button
                        type="text"
                        onClick={() =>
                          setOpenMenu(openMenu === data.id ? null : data.id)
                        }
                      >
                        ...
                      </Button>
                      {openMenu === data.id && (
                        <div className="absolute right-0 mt-0 w-30 bg-white border border-gray-100 shadow-lg rounded-md overflow-hidden">
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteClick(data.id, data.firstName)}
                            block
                          >
                            Delete
                          </Button>
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
                <h3 className="font-semibold text-gray-900">{data.firstName}</h3>
                <Tag color={data.role === 'admin' ? 'blue' : 'green'}>{data.role}</Tag>
              </div>
              <p className="text-sm text-gray-600">{data.email}</p>
              <div className="flex gap-2 mt-3">
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  block
                  onClick={() => handleDeleteClick(data.id, data.firstName)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ManageUser;
