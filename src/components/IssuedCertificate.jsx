let data = {
    name: "Provisional certificate",
    college: "aditya university",
    date: "03-09-2025",
    issued: "Issued",
    imageurl: "https://i0.wp.com/100transcripts.com/wp-content/uploads/2024/10/Provisional-Certificate-PC-1.jpg?fit=1322%2C1600&ssl=1"
}
import { AiOutlineFileExclamation } from "react-icons/ai";
const IssuedCertificate = () => {
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-xl ml-5 mr-5">
                    {
                        data.surname? <>
                            <div className="flex flex-col items-center mb-6">
                                <h2 className="text-4xl font-bold text-gray-800 text-center">Certificate of Completion</h2>
                                <h2 className="mt-4 text-xl font-semibold text-gray-700">{data.name}</h2>
                                <h2 className="mt-3 text-xl font-semibold text-gray-700">{data.college}</h2>
                                <h2 className="mt-3 text-xl font-semibold text-gray-700">{data.date}</h2>
                                <h2 className="mt-3 text-xl font-semibold text-gray-700 mb-5">Status:{data.issued}</h2>
                                <img src={data.imageurl} alt="" className="max-w-2xl mb-8" />
                                <button
                                    type="submit"
                                    className="w-[210px] py-3 text-white bg-blue-500 rounded-lg
                                     hover:bg-blue-500 transition cursor-pointer"
                                >
                                   Download Certificate
                                </button>
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
    )
}

export default IssuedCertificate