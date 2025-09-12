import {Modal, Button} from 'antd';

const PreviewDialog = ({isOpen, docUrl, docTitle, onClose, onDownload}) => {
  return (
    <Modal
      open={isOpen}
      title={docTitle}
      onCancel={onClose}
      footer={[
        <Button key="download" type="primary" onClick={onDownload}>
          Download
        </Button>,
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      width="80vw"
      styles={{
        body: {height: '70vh', display: 'flex', flexDirection: 'column'},
      }}
      centered
    >
      <div className="flex-1 overflow-auto flex items-center justify-center">
        {docUrl?.match(/\.(jpg|jpeg|png)$/i) ? (
          <img
            src={docUrl}
            alt={docTitle}
            style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'contain'}}
          />
        ) : (
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(docUrl)}&embedded=true`}
            title="PDF Preview"
            style={{width: '100%', height: '100%', border: 'none'}}
          />

        )}
      </div>
    </Modal>
  );
};

export default PreviewDialog;
