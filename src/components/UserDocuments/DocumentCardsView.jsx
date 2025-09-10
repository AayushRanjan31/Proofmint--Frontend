import {Card, Tag, Button} from 'antd';

const DocumentCardsView = ({docsArray, error, handlePreview, handleGetScanner}) => {
  const getStatusTag = (status) => {
    if (status === 'stamped') return <Tag color="green">Stamped</Tag>;
    if (status === 'uploaded') return <Tag color="blue">Uploaded</Tag>;
    return <Tag color="red">Expired</Tag>;
  };

  if (error) {
    return <h1 className="text-center text-red-500">{error}</h1>;
  }

  if (docsArray.length === 0) {
    return <h1 className="lg:hidden text-center text-gray-500">No documents found</h1>;
  }

  return (
    <div className="flex flex-col gap-4 lg:hidden">
      {docsArray.map((doc, idx) => (
        <Card
          key={idx}
          title={doc.title}
          extra={getStatusTag(doc.status)}
          className="shadow-sm"
        >
          <p>
            <strong>Document ID:</strong> {doc.documentId}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Issued: {doc.createdAt.slice(0, 10)}
          </p>

          <div className="flex gap-2 mt-3">
            <Button
              block
              type="default"
              onClick={() => handlePreview(doc)}
            >
              Preview
            </Button>
            <Button
              block
              danger
              type="default"
              onClick={() => handleGetScanner(doc)}
            >
              Scanner
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DocumentCardsView;
