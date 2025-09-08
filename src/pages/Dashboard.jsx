import AdminDocument from '../components/AdminDocument/AdminDocument';
import UserDocuments from '../components/UserDocuments/UserDocuments';
import {useSelector} from 'react-redux';


const Dashboard = () => {
  const {isAdmin} = useSelector((state) => state.auth);
  return (
    <>
      {isAdmin ? <AdminDocument/> : <UserDocuments /> }
    </>
  );
};
export default Dashboard;
