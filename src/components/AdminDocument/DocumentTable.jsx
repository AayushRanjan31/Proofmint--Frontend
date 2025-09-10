import {Table, Tag, Dropdown, Button} from 'antd';
import {RiDeleteBin6Line, RiMore2Fill} from 'react-icons/ri';
import {FaBan} from 'react-icons/fa';

const DocumentTable = ({documents, error, onRevoke, onDeleteClick}) => {
  const getStatusTag = (status) => {
    if (status === 'stamped') return <Tag color="green">Stamped</Tag>;
    if (status === 'uploaded') return <Tag color="blue">Uploaded</Tag>;
    return <Tag color="red">Expired</Tag>;
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Document ID',
      dataIndex: 'documentId',
      key: 'documentId',
    },
    {
      title: 'Issued',
      dataIndex: 'issuer',
      key: 'issuer',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Expire',
      dataIndex: 'expiry',
      key: 'expiry',
      render: (expiry) => expiry?.slice(0, 10),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Dropdown
          trigger={['click']}
          menu={{
            items: [
              {
                key: 'revoke',
                label: 'Revoke',
                icon: <FaBan size={14} />,
                onClick: () => onRevoke(record.certificateId, record.title),
              },
              {
                key: 'delete',
                label: 'Delete',
                icon: <RiDeleteBin6Line size={14} />,
                danger: true,
                onClick: () => onDeleteClick(record.certificateId, record.title),
              },
            ],
          }}
        >
          <Button icon={<RiMore2Fill />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="hidden lg:block mb-10">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={documents}
        pagination={{pageSize: 10}}
        locale={{
          emptyText: error ? (
            <span className="text-red-500">{error}</span>
          ) : (
            'No documents found'
          ),
        }}
        className="custom-table"
      />
    </div>
  );
};

export default DocumentTable;
