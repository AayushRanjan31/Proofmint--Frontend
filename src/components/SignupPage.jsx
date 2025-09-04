import { setUsername, setEmail, setPassword, setConfirmPassword, registerUser } from "../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
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
    <div className="flex items-center justify-center min-h-screen md:ml-[250px]">
      <div className="w-full max-w-sm p-5 md:p-8 bg-white shadow-md rounded-xl m-2">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-2">
            <img src="" alt="" />
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

          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-lg
             hover:bg-blue-700 transition cursor-pointer"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );

}
export default Signup;
