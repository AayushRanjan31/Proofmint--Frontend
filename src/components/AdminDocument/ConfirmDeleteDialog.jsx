import {Modal} from 'antd';

const ConfirmDeleteDialog = ({isOpen, title, onCancel, onConfirm}) => {
  return (
    <Modal
      open={isOpen}
      title="Delete Document"
      onCancel={onCancel}
      onOk={onConfirm}
      okText="Yes, Delete"
      okButtonProps={{danger: true}}
      cancelText="Cancel"
    >
      <p>
        Do you really want to delete{' '}
        <span className="font-medium text-red-600">{title}</span>?
      </p>
    </Modal>
  );
};

export default ConfirmDeleteDialog;
