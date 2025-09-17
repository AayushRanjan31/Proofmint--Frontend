import {Table, Tag, Dropdown, Button} from 'antd';
import {RiMore2Fill} from 'react-icons/ri';

const DocumentTableView = ({docsArray, error, openMenu,
  setOpenMenu, handlePreview, handleGetScanner}) => {
  if (error) {
    return (
      <div className="hidden lg:block text-center text-red-500 p-4">
        {error}
      </div>
    );
  }


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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Issued',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => date.slice(0, 10),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, doc, idx) => {
        const items = [
          {
            key: '1',
            label: (
              <button
                onClick={() => {
                  handlePreview(doc);
                  setOpenMenu(null);
                }}
                className="w-full text-left"
              >
                Preview
              </button>
            ),
          },
          {
            key: '2',
            label: (
              <button
                onClick={() => {
                  handleGetScanner(doc);
                  setOpenMenu(null);
                }}
                className="w-full text-left text-red-600"
              >
                Scanner
              </button>
            ),
          },
        ];

        return (
          <Dropdown
            menu={{items}}
            trigger={['click']}
            open={openMenu === idx}
            onOpenChange={(flag) => setOpenMenu(flag ? idx : null)}
          >
            <Button type="text" icon={<RiMore2Fill size={18} />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="hidden lg:block">
      <Table
        rowKey={(record) => record.documentId}
        dataSource={docsArray}
        columns={columns}
        pagination={{pageSize: 10}}
        className="mb-20 custom-table"
      />
    </div>
  );
};

export default DocumentTableView;
