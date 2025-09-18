import {useDispatch, useSelector} from 'react-redux';
import {
  setResetPasswordEmail,
  forgotPassword,
} from '../redux/slices/forgotPasswordSlice';
import {toast} from 'react-toastify';
import {Mail} from 'lucide-react';
import {useNavigate, Link} from 'react-router-dom';
import {setLoginEmail, setLoginPassword} from '../redux/slices/authSlice';
import {resetOtpState} from '../redux/slices/otpSlice';
import {Input, Button, Typography} from 'antd';

const {Text} = Typography;

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, resetPasswordEmail} = useSelector(
      (state) => state.forgotPassword,
  );

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
      navigate('/otp-verification');
    } catch (error) {
      toast.error(error || 'Failed to send OTP', {toastId: 'error'});
    }
  };

  const handleClick = () => {
    dispatch(setLoginPassword(''));
    dispatch(setLoginEmail(''));
  };

  return (
    <div className="flex items-center justify-center min-h-[93vh] bg-gradient-to-br from-blue-50 to-blue-100">
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

        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
          <Input
            type="email"
            size="large"
            placeholder="Enter your email"
            value={resetPasswordEmail}
            onChange={(e) => dispatch(setResetPasswordEmail(e.target.value))}
          />

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="w-full"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </Button>
        </form>

        <Text className="text-center text-sm text-gray-500 pt-3">
          Remembered your password?{' '}
          <Link
            to="/"
            className="text-blue-600 hover:underline font-medium"
            onClick={handleClick}
          >
            Back to Login
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default ForgotPassword;
