import DocumentsTable from '../components/DocumentsTable';
import AdminDocument from '../components/AdminDocument';
import {useSelector} from 'react-redux';

const Dashboard = () => {
  const {isAdmin} = useSelector((state) => state.auth);
  return (
    <>
      {isAdmin ? <AdminDocument/> : <DocumentsTable/> }
    </>
  );
};
export default Dashboard;
