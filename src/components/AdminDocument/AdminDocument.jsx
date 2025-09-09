import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {
  allFetchAdminDocuments,
  removeDocument,
  revokeDocument,
} from '../../redux/slices/documentSlice';
import {message} from 'antd';
import DocumentTable from './DocumentTable';
import DocumentCards from './DocumentCards';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

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
      message.success(`Document "${confirmDialog.docTitle}" deleted successfully`);
      setConfirmDialog({isOpen: false, docId: null, docTitle: ''});
      dispatch(allFetchAdminDocuments());
    } catch {
      message.error('Failed to delete document');
      setConfirmDialog({isOpen: false, docId: null, docTitle: ''});
    }
  };

  const handleRevoke = async (docId, title) => {
    try {
      await dispatch(revokeDocument(docId)).unwrap();
      message.success(`Document "${title}" revoked successfully`);
      dispatch(allFetchAdminDocuments());
      setOpenMenu(null);
    } catch {
      message.error('Failed to revoke document');
    }
  };

  return (
    <div className="lg:flex lg:justify-center md:ml-[280px]">
      <div className="px-2 mt-10 lg:w-[70vw]">
        <div className="flex items-center justify-between mb-4 text-[var(--text-color)]">
          <p className="pb-3 md:text-5xl text-4xl font-bold">All Documents</p>
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
