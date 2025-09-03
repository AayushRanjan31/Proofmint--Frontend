import {useState} from 'react';
import UploadDocument from "../components/UploadDocument"
import VerifyDocument from "../components/VerifyDocument"
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
