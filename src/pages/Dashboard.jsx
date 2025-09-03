import {useState} from 'react';
import UploadDocument from "../components/UploadDocument"
import VerifyDocument from "../components/VerifyDocument"
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
