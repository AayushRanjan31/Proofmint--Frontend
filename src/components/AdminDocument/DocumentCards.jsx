import {Card, Tag, Button} from 'antd';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {FaBan} from 'react-icons/fa';

const DocumentCards = ({documents, onRevoke, onDeleteClick}) => {
  const getStatusTag = (status) => {
    if (status === 'stamped') {
      return <Tag color="green">Stamped</Tag>;
    }
    if (status === 'uploaded') {
      return <Tag color="blue">Uploaded</Tag>;
    }
    return <Tag color="red">Expired</Tag>;
  };

  return (
    <div className="flex flex-col gap-4 lg:hidden">
      {documents?.map((doc) => (
        <Card
          key={doc.id}
          title={doc.title}
          extra={getStatusTag(doc.status)}
        >
          <p>
            <strong>ID:</strong> {doc.documentId}
          </p>
          <p>
            <strong>Issued:</strong> {doc.issuer}
          </p>
          <p>
            <strong>Expire:</strong> {doc.expiry?.slice(0, 10)}
          </p>

          <div className="flex gap-2 mt-3">
            <Button
              block
              type="default"
              onClick={() => onRevoke(doc.certificateId, doc.title)}
              icon={<FaBan size={14} />}
            >
              Revoke
            </Button>
            <Button
              block
              danger
              type="default"
              onClick={() => onDeleteClick(doc.certificateId, doc.title)}
              icon={<RiDeleteBin6Line size={14} />}
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DocumentCards;
