import {useDispatch, useSelector} from 'react-redux';
import {setResetPasswordEmail, forgotPassword} from '../redux/slices/forgetPasswordSlice';
import {toast} from 'react-toastify';
import {Mail} from 'lucide-react';
import {useNavigate, Link} from 'react-router-dom';
import {setLoginEmail, setLoginPassword} from '../redux/slices/authSlice';
import {resetOtpState} from '../redux/slices/otpSlice';

const ForgotPassword= () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, resetPasswordEmail} = useSelector((state) => state.forgotPassword);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetOtpState());
    if (!resetPasswordEmail) {
      toast.error('Please enter your email', {toastId: 'error'});
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetPasswordEmail)) {
      toast.error('Please enter a valid email address', {toastId: 'email'});
      return;
    }

    try {
      dispatch(setResetPasswordEmail(resetPasswordEmail));
      await dispatch(forgotPassword(resetPasswordEmail)).unwrap();
      navigate('/otpVerification');
    } catch (error) {
      toast.error(error || 'Failed to send OTP', {toastId: 'error'});
    }
  };
  const handleClick = () => {
    dispatch(setLoginPassword(''));
    dispatch(setLoginEmail(''));
  };

  return (
    <div className="flex items-center justify-center min-h-[92vh]
    bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 m-3">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-2">
            <Mail className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Forgot Password?</h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter your registered email and we will send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetPasswordEmail}
              onChange={(e) => dispatch(setResetPasswordEmail(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              shadow-sm text-gray-700 placeholder-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-blue-600 rounded-lg font-medium
            hover:bg-blue-700 transition duration-200 shadow-md disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 pt-3">
          Remembered your password?{' '}
          <Link
            to="/"
            className="text-blue-600 hover:underline font-medium"
            onClick={handleClick}
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
