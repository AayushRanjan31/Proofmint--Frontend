import {setNumber, setFirstname, setLastname, setEmail, setPassword, setConfirmPassword, registerUser} from '../redux/slices/authSlice';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const SignupPage = () => {
  const {number, signUpFirstname, signUpLastname, signUpEmail, signUpPassword,
    signUpConfirmPassword} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const handleSubmit =async (e) => {
    e.preventDefault();
    if (signUpFirstname.length <= 5) {
      toast.error('FirstName must be 6 characters.', {toastId: 'first-name-error'});
    } else if (signUpLastname.length <= 5) {
      toast.error('Lastname must be 6 characters.', {toastId: 'last-name-error'});
    } else if (signUpPassword.length < 8) {
      toast.error('Password must be 8 characters.', {toastId: 'password-error'});
    } else if (signUpConfirmPassword.length < 8) {
      toast.error('ConfirmPassword must be 8 characters.', {toastId: 'confirm-password-error'});
    } else if (signUpPassword !== signUpConfirmPassword) {
      toast.error('passwords must be same.', {toastId: 'match-password-error'});
    } else if (number.length<= 9 || number.length>10) {
      toast.error('Phone number must be 10 digits .', {toastId: 'phone-number'});
    } else {
      const res=await dispatch(registerUser({signUpFirstname, signUpLastname, signUpEmail,
        signUpPassword, number})).unwrap();
      if (res.status ===true) {
        dispatch(setFirstname(''));
        dispatch(setLastname(''));
        dispatch(setEmail(''));
        dispatch(setPassword(''));
        dispatch(setConfirmPassword(''));
        dispatch(setNumber(''));
        navigate('/');
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-[85.5vh] mt-[67px]">
      <div className="w-full max-w-md p-5 md:p-8 bg-white shadow-md rounded-xl m-3">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-4xl font-bold text-gray-800">ProofMint</span>
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-700">Signup</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={signUpFirstname}
              onChange={(e) => dispatch(setFirstname(e.target.value))}
              className="w-full px-4 py-3 border  border-gray-400  rounded-lg focus:ring-2
               focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              value={signUpLastname}
              onChange={(e) => dispatch(setLastname(e.target.value))}
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
              placeholder="Confirm Password"
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
              placeholder="Phone Number"
              value={number}
              onChange={(e) => dispatch(setNumber(e.target.value))}
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
            Sign up
          </button>
          <p className="text-center">Already have an account? <Link to={'/'} >Login In </Link></p>
        </form>
      </div>
    </div>
  );
};
export default SignupPage;
