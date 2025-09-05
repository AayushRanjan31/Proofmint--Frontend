import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../utils/proofMintApi";
import { useEffect } from "react";


const ManageUser = () => {
// const userData = [{
//     id:1,
//     name:'aayush',
//     email:'aayush@gmail.com',
//     role: 'engineering',
//     createdby: '12-10-2002',
//     action: 'delete' 
// }]

  const dispatch = useDispatch();
  const {userData, error} = useSelector((state) => state.documents);
    console.log(userData)
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

    return (
        <div className="lg:flex lg:justify-center md:ml-[280px] mt-10">
               <div className="m-8 shadow rounded-lg p-5 bg-[var(--component-bg)] lg:w-[70vw]">
                  <div className="hidden overflow-x-auto lg:block">
                     <table className="w-full border-collapse">
                          <thead>
              <tr className="text-left bg-[var(--table-bg)] text-[var(--text-color)]">
                <th className="p-3 border-b">Id</th>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Role</th>
                  <th className="p-3 border-b">Created At</th>
                <th className="p-3 border-b">Action</th>
              </tr>
            </thead>
             <tbody>
                {userData?.map((data, idx) => (
                  <tr key={idx} className="text-[var(--text-color)]">
                    <td className="p-3 border-b">{data.id}</td>
                    <td className="p-3 border-b">{data.name}</td>
                    <td className="p-3 border-b">{data.email}</td>
                    <td className="p-3 border-b">{data.role}</td>
                    <td className="p-3 border-b">{data.createdby}</td>
                    <td className="p-3 border-b"> <button className="px-2 py-1 bg-[var(--btn-color)] rounded cursor-pointer hover:bg-gray-200">delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
               <div className="space-y-4 lg:hidden">
                 {userData?.map((data, idx) => {
                     return <div
                key={idx}
                className="p-4 border rounded-lg shadow-sm bg-gray-50"
              >   
               <h3 className="text-lg font-semibold">Id: {data.id}</h3>
                <p className="text-gray-600">Name: {data.name}</p>   
                <p className="text-gray-600">Email: {data.email}</p>   
                <p className="text-gray-600">Role: {data.role}</p>  
                <p className="text-gray-600">Created At: {data.createdby}</p>   
                <p className="text-gray-600">Action: {data.action}</p>   
              </div>
                 })}
              </div>
               </div>
        </div>
    )
}

export default ManageUser;