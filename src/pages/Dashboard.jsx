import {useState} from 'react';
import DocumentsTable from '../components/DocumentsTable';
import VerifyDocument from '../components/VerifyDocument';

const Dashboard = () => {
  const [login, setlogin] = useState(false);
  return (
    <section>
      {login ? <div>
        <DocumentsTable />
      </div> :
       <div>
         <VerifyDocument/>
       </div>
      }
    </section>
  );
};

export default Dashboard;
