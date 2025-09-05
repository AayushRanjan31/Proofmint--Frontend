import { useSelector, useDispatch } from "react-redux";
import { setLoginEmail, setLoginPassword } from "../redux/slices/authSlice";
import { loginUser } from "../redux/slices/authSlice";
import { toast } from 'react-toastify';
import { Link} from "react-router-dom";

const Login = () => {
  const {loginEmail, loginPassword} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginPassword.length <= 5) {
      toast.error('Password must be 6 characters.', { toastId: 'fetch-error' });
    }
    else {
    let res=await dispatch(loginUser({ loginEmail, loginPassword }));
    }
  };
  return (

    <div className="flex items-center justify-center min-h-[90vh]">


      <div className="w-full max-w-sm p-8 bg-white shadow-md rounded-xl m-3">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-2">

            <span className="text-4xl font-bold text-gray-800">ProofMint</span>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => dispatch(setLoginEmail(e.target.value))}
              className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2
               focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => dispatch(setLoginPassword(e.target.value))}
              className="w-full px-4 py-3 border  border-gray-400  rounded-lg focus:ring-2
               focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-[10px] text-white bg-blue-600 rounded-lg
             hover:bg-blue-700 transition cursor-pointer mb-3"
          >
            Login
          </button>
          <p className="text-center">Don't have an account? <Link to={'/signUp'} > Sign Up</Link></p>
        </form>
      </div>
    </div>

  );
};

export default Login;
