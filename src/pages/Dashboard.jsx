import {useState} from 'react';
import VerifyDocument from '../components/VerifyDocument';
import UploadDocument from '../components/uploadDocument';

const Dashboard = () => {
  const [login, setlogin] = useState(true);
  return (
    <section>
      {login ? <div>
        <UploadDocument />
      </div> :
       <div>
         <VerifyDocument/>
       </div>
      }
    </section>
  );
};

export default Dashboard;
