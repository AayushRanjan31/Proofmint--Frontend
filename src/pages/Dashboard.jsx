import {useState} from 'react';
import VerifyDocument from '../components/VerifyDocument';
import Setting from '../components/Setting';
import UploadDocument from '../components/uploadDocument';
import DocumentsTable from '../components/DocumentsTable';

const Dashboard = () => {
  const [login, setlogin] = useState(false);
  return (
    <section>
      {login ? <div>
        <Setting />
      </div> :
       <div>
         <UploadDocument/>
       </div>
      }
    </section>
  );
};

export default Dashboard;
