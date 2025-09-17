import {useSelector, useDispatch} from 'react-redux';
import {
  setNumber,
  setFirstname,
  setLastname,
  setEmail,
  setPassword,
  setConfirmPassword,
  registerUser,
} from '../redux/slices/authSlice';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Input, Button} from 'antd';
import {useState} from 'react';
import {sendSignupOtp, verifySignupOtp} from '../utils/proofMintApi';
import Typography from 'antd/es/typography/Typography';

const {Title, Text} = Typography;

const SignupPage = () => {
  const {
    number,
    signUpFirstname,
    signUpLastname,
    signUpEmail,
    signUpPassword,
    signUpConfirmPassword,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendOtp = async () => {
    if (!signUpEmail) return toast.error('Please enter your email first', {toastId: 'email'});
    if (!isValidEmail(signUpEmail)) return toast.error('Please enter a valid email', {toastId: 'error'});

    setSendingOtp(true);
    try {
      const res = await sendSignupOtp(signUpEmail);
      if (res.status === true || res.success === true) {
        toast.success(res.message || 'OTP sent to your email', {toastId: 'sent'});
        setOtpSent(true);
      }
    } catch {
      toast.error('Failed to send OTP', {toastId: 'failed'});
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return toast.error('Please enter OTP', {toastId: 'otp'});

    try {
      const res = await verifySignupOtp(signUpEmail, otp);
      if (res.status === true || res.success === true) {
        toast.success(res.message || 'OTP verified successfully', {toastId: 'sucessfull'});
        setOtpVerified(true);
      }
    } catch {
      toast.error('Invalid OTP', {toastId: 'invaild'});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) return toast.error('Please verify your email OTP first');
    if (signUpFirstname.length <= 2) return toast.error('FirstName must be 3 characters.');
    if (signUpLastname.length <= 2) return toast.error('Lastname must be 3 characters.');
    if (signUpPassword.length < 8) return toast.error('Password must be 8 characters.');
    if (signUpConfirmPassword.length < 8) return toast.error('ConfirmPassword must be 8 characters.');
    if (signUpPassword !== signUpConfirmPassword) return toast.error('Passwords must be same.');
    if (number.length !== 10) return toast.error('Phone number must be 10 digits.');

    try {
      const res = await dispatch(registerUser({
        signUpFirstname,
        signUpLastname,
        signUpEmail,
        signUpPassword,
        number,
      })).unwrap();

      if (res.status === true) {
        dispatch(setFirstname(''));
        dispatch(setLastname(''));
        dispatch(setEmail(''));
        dispatch(setPassword(''));
        dispatch(setConfirmPassword(''));
        dispatch(setNumber(''));
        navigate('/');
      }
    } catch {
      toast.error('Email already exists', {toastId: 'signup'});
    }
  };

  const isFormValid = () =>
    signUpFirstname &&
    signUpLastname &&
    signUpEmail &&
    isValidEmail(signUpEmail) &&
    signUpPassword &&
    signUpConfirmPassword &&
    number &&
    otpVerified;

  return (
    <div className="flex items-center justify-center min-h-[81vh] ">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-xl m-3">
        <div className="flex flex-col items-center mb-6">
          <Title level={2} className="text-gray-800">ProofMint</Title>
          <Title level={4} className="text-gray-700 mt-2">Signup</Title>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            placeholder="First Name"
            className='h-[40px]'
            value={signUpFirstname}
            onChange={(e) => dispatch(setFirstname(e.target.value))}
          />
          <Input
            placeholder="Last Name"
            className='h-[40px]'
            value={signUpLastname}
            onChange={(e) => dispatch(setLastname(e.target.value))}
          />
          <Input
            placeholder="Email"
            className='h-[40px]'
            type="email"
            value={signUpEmail}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            disabled={otpSent}
          />

          {/* OTP Section */}
          <div className="flex gap-2">
            <Input
              placeholder="Enter OTP"
              className='h-[40px]'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={!otpSent || otpVerified}
            />
            {!otpSent ? (
              <Button
                type="primary"
                onClick={handleSendOtp}
                disabled={!signUpEmail || !isValidEmail(signUpEmail) || sendingOtp}
                loading={sendingOtp}
              >
                Send OTP
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={handleVerifyOtp}
                disabled={otpVerified}
              >
                {otpVerified ? 'Verified' : 'Verify OTP'}
              </Button>
            )}
          </div>

          <Input.Password
            placeholder="Password"
            className='h-[40px]'
            value={signUpPassword}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
          <Input.Password
            placeholder="Confirm Password"
            className='h-[40px]'
            value={signUpConfirmPassword}
            onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
          />
          <Input
            placeholder="Phone Number"
            className='h-[40px]'
            value={number}
            onChange={(e) => dispatch(setNumber(e.target.value))}
          />

          <Button
            type="primary"
            htmlType="submit"
            className="w-full py-2"
            disabled={!isFormValid()}
          >
            Sign Up
          </Button>
          <Text>
             Already have an account? &nbsp;
            <Link to="/" className="text-blue-600 hover:underline">
             Login
            </Link>
          </Text>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

