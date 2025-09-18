import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {
  allFetchAdminDocuments,
  removeDocument,
  revokeDocument,
} from '../../redux/slices/documentSlice';
import DocumentTable from './DocumentTable';
import DocumentCards from './DocumentCards';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import {toast} from 'react-toastify';
import {Typography} from 'antd';

const {Title} = Typography;

const AdminDocument = () => {
  const dispatch = useDispatch();
  const {documents, error} = useSelector((state) => state.documents);
  const [openMenu, setOpenMenu] = useState(null);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    docId: null,
    docTitle: '',
  });

  useEffect(() => {
    dispatch(allFetchAdminDocuments());
  }, [dispatch]);

  const handleDeleteClick = (docId, title) => {
    setConfirmDialog({isOpen: true, docId, docTitle: title});
    setOpenMenu(null);
  };

  const handleCancelDelete = () =>
    setConfirmDialog({isOpen: false, docId: null, docTitle: ''});

  const handleConfirmDelete = async () => {
    try {
      await dispatch(removeDocument(confirmDialog.docId)).unwrap();
      toast.success(`Document "${confirmDialog.docTitle}" deleted successfully`, {toastId: 'successfully'});
      setConfirmDialog({isOpen: false, docId: null, docTitle: ''});
      dispatch(allFetchAdminDocuments());
    } catch {
      toast.error('Failed to delete document', {toastId: 'delete'});
      setConfirmDialog({isOpen: false, docId: null, docTitle: ''});
    }
  };

  const handleRevoke = async (docId, title) => {
    try {
      await dispatch(revokeDocument(docId)).unwrap();
      toast.success(`Document "${title}" revoked successfully`, {toastId: 'revoked'});
      dispatch(allFetchAdminDocuments());
      setOpenMenu(null);
    } catch {
      toast.error('Failed to revoke document', {toastId: 'failed'});
    }
  };

  return (
    <div className="lg:flex lg:justify-center md:ml-[280px]">
      <div className="px-2 mt-10 lg:w-[70vw]">
        <div className="flex items-center justify-between mb-4 text-[var(--text-color)]">
          <Title>All Documents</Title>
        </div>

        <DocumentTable
          documents={documents}
          error={error}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          onRevoke={handleRevoke}
          onDeleteClick={handleDeleteClick}
        />

        <DocumentCards
          documents={documents}
          onRevoke={handleRevoke}
          onDeleteClick={handleDeleteClick}
        />
      </div>

      <ConfirmDeleteDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.docTitle}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default AdminDocument;
