import { setUsername, setEmail, setPassword, setConfirmPassword, registerUser } from "../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
const Signup = () => {
  const { signUpUsername, signUpEmail, signUpPassword, signUpConfirmPassword } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (signUpUsername.length <= 5) {
      toast.error('Username must be 6 characters.', { toastId: 'username-error' });
    }
    else if (signUpPassword.length <=5) {
      toast.error('Password must be 6 characters.', { toastId: 'password-error' });
    }
    else if (signUpConfirmPassword.length <= 5) {
      toast.error('ConfirmPassword must be 6 characters.', { toastId: 'confirm-password-error' });
    }
    else if (signUpPassword !== signUpConfirmPassword) {
      toast.error('passwords must be same.', { toastId: 'match-password-error' });
    }
    else {
      dispatch(registerUser({ signUpUsername, signUpEmail, signUpPassword }))
    }
  };
  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <div className="w-full max-w-sm p-5 md:p-8 bg-white shadow-md rounded-xl m-3">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-2">
            <img src="data:image/png;base64,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" alt="" />
            <span className="text-4xl font-bold text-gray-800">ProofMint</span>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">Signup</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={signUpUsername}
              onChange={(e) => dispatch(setUsername(e.target.value))}
              className="w-full px-4 py-3 border  border-gray-400  rounded-lg focus:ring-2
               focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
            <div>
            <input
              type="text"
              placeholder="Username"
              value={signUpUsername}
              onChange={(e) => dispatch(setUsername(e.target.value))}
              className="w-full px-4 py-3 border  border-gray-400  rounded-lg focus:ring-2
               focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              className="w-full px-4 py-3 border  border-gray-400  rounded-lg focus:ring-2
               focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              className="w-full px-4 py-3 border border-gray-400  rounded-lg focus:ring-2
               focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm password"
              value={signUpConfirmPassword}
              onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
              className="w-full px-4 py-3 border  border-gray-400  rounded-lg focus:ring-2
               focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
            <div>
            <input
              type="text"
              placeholder="Username"
              value={signUpUsername}
              onChange={(e) => dispatch(setUsername(e.target.value))}
              className="w-full px-4 py-3 border  border-gray-400  rounded-lg focus:ring-2
               focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-[10px] text-white bg-blue-600 rounded-lg
             hover:bg-blue-700 transition cursor-pointer rounded mb-3"
          >
            Sign up
          </button>
         <Link to={'/'} ><p className="text-center">Already have an account? Login In</p></Link>
        </form>
      </div>
    </div>
  );

}
export default Signup;
