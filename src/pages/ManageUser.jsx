import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RiDeleteBin6Line, RiMore2Fill} from 'react-icons/ri';
import {fetchAllUser, removeUser} from '../redux/slices/adminSlice';
import {toast} from 'react-toastify';
import {
  Table,
  Dropdown,
  Menu,
  Button,
  Modal,
  Tag,
  Card,
  Space,
} from 'antd';

const ManageUser = () => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    userId: null,
    userName: '',
  });

  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state.admin);

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
          toast.success(
              `User ${confirmDialog.userName} deleted successfully`,
              {toastId: 'delete'},
          );
          setConfirmDialog({isOpen: false, userId: null, userName: ''});
        })
        .catch(() => {
          toast.error('Failed to delete user', {toastId: 'deleted'});
          setConfirmDialog({isOpen: false, userId: null, userName: ''});
        });
  };

  const handleCancelDelete = () => {
    setConfirmDialog({isOpen: false, userId: null, userName: ''});
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color="blue" className="px-2 py-1">
          {role}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'right',
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="delete"
                danger
                icon={<RiDeleteBin6Line />}
                onClick={() => handleDeleteClick(record.id, record.firstName)}
              >
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<RiMore2Fill />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="lg:flex lg:justify-center md:ml-[280px] mt-20">
      <div className="m-2 md:border lg:w-[70vw]">
        {/* Desktop Table */}
        <div className="hidden lg:block">
          <Table
            dataSource={userData}
            columns={columns}
            rowKey="id"
            pagination={false}
            className="custom-table"
          />
        </div>

        {/* Mobile Cards */}
        <div className="flex flex-col gap-3 lg:hidden">
          {userData.map((data) => (
            <Card
              key={data.id}
              title={
                <Space>
                  <span className="font-semibold">{data.firstName}</span>
                  <Tag color="blue">{data.role}</Tag>
                </Space>
              }
              extra={
                <Button
                  danger
                  size="small"
                  icon={<RiDeleteBin6Line />}
                  onClick={() => handleDeleteClick(data.id, data.firstName)}
                >
                  Delete
                </Button>
              }
            >
              <p className="text-sm">{data.email}</p>
            </Card>
          ))}
        </div>
      </div>

      <Modal
        title="Delete User"
        open={confirmDialog.isOpen}
        onCancel={handleCancelDelete}
        onOk={handleConfirmDelete}
        okText="Yes, Delete"
        okButtonProps={{danger: true}}
      >
        <p>
          Do you really want to delete{' '}
          <span className="font-medium text-red-600">
            {confirmDialog.userName}
          </span>
          ?
        </p>
      </Modal>
    </div>
  );
};

export default ManageUser;
