import { useState } from "react";
import DocumentsTable from "../components/DocumentsTable";
import AdminDocument from "../components/AdminDocument";

const Dashboard = () => {
    const [user , setUser] = useState("admin")
 return (
    <>
       {user === 'user' ? <DocumentsTable/> : <AdminDocument/>}
    </>
 )
}
export default Dashboard;