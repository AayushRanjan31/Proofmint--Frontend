import {useState} from 'react';
// import DocumentsTable from '../components/DocumentsTable';
import VerifyDocument from '../components/VerifyDocument';

const Dashboard = () => {
  const [login, setlogin] = useState(false);
  return (
    <section className='md:ml-63 mt-20 md:mt-10'>
      {login ? <div>
        {/* <DocumentsTable /> */}
      </div> :
       <div>
         <VerifyDocument/>
       </div>
      }
    </section>
  );
};

export default Dashboard;
