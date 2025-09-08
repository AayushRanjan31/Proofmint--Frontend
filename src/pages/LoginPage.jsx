import {useSelector, useDispatch} from 'react-redux';
import {setLoginEmail, setLoginPassword, setLoggedIn, loginUser} from '../redux/slices/authSlice';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {setResetPasswordEmail} from '../redux/slices/forgetPasswordSlice';

const LoginPage = () => {
  const {loginEmail, loginPassword} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginPassword.length < 8) {
      toast.error('Password must be 8 characters.', {toastId: 'fetch-error'});
    } else {
      const res = await dispatch(loginUser({loginEmail, loginPassword}));
      if (res.payload?.status == true) {
        dispatch(setLoggedIn(true));
        navigate('/');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[81vh]">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-xl m-3">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-2">
            <p className="pb-1 md:text-5xl text-4xl font-bold text-gray-800">ProofMint</p>
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
              className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2
               focus:ring-blue-500 focus:outline-none"
              required
            />
            {/* Forgot password link */}
            <div className="text-right mt-2">
              <Link
                to="forgetPassword"
                onClick={() => {
                  dispatch(setResetPasswordEmail(''));
                }}
                className="text-blue-600 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-[10px] text-white bg-blue-600 rounded-lg
             hover:bg-blue-700 transition cursor-pointer mb-3"
          >
            Login
          </button>
          <p className="text-center">
            Dont have an account? &nbsp;
            <Link to="/signUp" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
