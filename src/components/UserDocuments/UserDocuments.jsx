import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {allFetchDocument} from '../../redux/slices/documentSlice';
import DocumentTableView from './DocumentTableView';
import DocumentCardsView from './DocumentCardsView';
import PreviewDialog from './PreviewDialog';

const UserDocuments = () => {
  const dispatch = useDispatch();
  const {documents, error, loading} = useSelector((state) => state.documents);

  const [openMenu, setOpenMenu] = useState(null);
  const [previewDialog, setPreviewDialog] = useState({
    isOpen: false,
    docUrl: '',
    docTitle: '',
  });

  useEffect(() => {
    dispatch(allFetchDocument());
  }, [dispatch]);

  const handlePreview = (doc) => {
    setPreviewDialog({
      isOpen: true,
      docUrl: doc.preview || doc.fileUrl,
      docTitle: doc.title,
    });
    setOpenMenu(null);
  };

  const handleGetScanner = async (doc) => {
    try {
      const response = await fetch(doc.qrCode, {mode: 'cors'});
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${doc.title}-scanner.png`;
      link.click();

      URL.revokeObjectURL(blobUrl);
      setOpenMenu(null);
    } catch (err) {
      console.error('Scanner download failed:', err);
    }
  };

  const handleDownload = async () => {
    if (!previewDialog.docUrl) return;

    try {
      const response = await fetch(previewDialog.docUrl, {mode: 'cors'});
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;

      const extension = previewDialog.docUrl.match(/\.(jpg|jpeg|png|pdf)$/i) ?
        previewDialog.docUrl.split('.').pop() :
        blob.type === 'application/pdf' ?
        'pdf' :
        'png';

      link.download = `${previewDialog.docTitle || 'document'}.${extension}`;
      link.click();

      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const closePreview = () =>
    setPreviewDialog({isOpen: false, docUrl: '', docTitle: ''});

  const docsArray = Array.isArray(documents) ? documents : [];

  return (
    <div className="lg:flex lg:justify-center md:ml-[280px]">
      <div className="px-2 mt-10 lg:w-[70vw]">
        <div className="flex items-center justify-between mb-4 text-[var(--text-color)]">
          <p className="pb-3 md:text-5xl text-4xl font-bold">Documents</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading documents...</p>
        ) : (
          <>
            {/* Desktop Table */}
            <DocumentTableView
              docsArray={docsArray}
              error={error}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              handlePreview={handlePreview}
              handleGetScanner={handleGetScanner}
            />

            {/* Mobile Cards */}
            <DocumentCardsView
              docsArray={docsArray}
              error={error}
              handlePreview={handlePreview}
              handleGetScanner={handleGetScanner}
            />
          </>
        )}

        {/* Preview Modal */}
        <PreviewDialog
          isOpen={previewDialog.isOpen}
          docUrl={previewDialog.docUrl}
          docTitle={previewDialog.docTitle}
          onClose={closePreview}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
};

export default UserDocuments;
