const data = {
  name: 'Provisional certificate',
  college: 'aditya university',
  date: '03-09-2025',
  issued: 'Issued',
  imageurl: 'https://res.cloudinary.com/dsmx5xh6y/raw/upload/v1756988567/proofmint/candidate_test_summer_camp_v1%20(2)-1756988563153',
};
import { useSelector } from 'react-redux';
import {AiOutlineFileExclamation} from 'react-icons/ai';
 
 
const IssuedCertificate = () => {
  const {certificate} = useSelector((state) => state.verifyDocument);
  console.log(certificate)
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 mt-10 p-2">
        <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-xl ml-5 mr-5">
          {
                        data ? <>
                          <div className="flex flex-col items-center mb-6">
                            <h2 className="text-4xl font-bold text-gray-800 text-center">Certificate of Completion</h2>
                            <h2 className="mt-4 text-xl font-semibold text-gray-700">{data.name}</h2>
                            <h2 className="mt-3 text-xl font-semibold text-gray-700">{data.college}</h2>
                            <h2 className="mt-3 text-xl font-semibold text-gray-700">{data.date}</h2>
                            <h2 className="mt-3 text-xl font-semibold text-gray-700 mb-5">Status:{data.issued}</h2>
                            <iframe
                              src={gviewUrl}
                              width="100%"
                              height="600px"
                              title="Document Preview"
                              style={{border: 'none'}}
                            />


                          </div>
                        </> : <>
                          <div className="flex flex-col items-center gap-4">
                            <h2 className="text-4xl  font-bold text-gray-800 text-center">Invalid Document ID</h2>

                            <AiOutlineFileExclamation className="h-[200px] w-4xl text-gray-400" />
                            <p className="text-gray-700">Please check again</p>
                            <button
                              type="submit"
                              className="w-[250px] py-3 text-white bg-blue-500 rounded-lg
                                     hover:bg-blue-500 transition cursor-pointer"
                            >
                                    Go back
                            </button>
                          </div>
                        </>
          }

        </div>
      </div>
    </div>
  );
};

export default IssuedCertificate;
