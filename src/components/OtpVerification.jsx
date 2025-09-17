import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  verifyOtp,
  setOtpDigit,
  setActiveIndex,
  setOtpArray,
  resetOtpState,
} from '../redux/slices/otpSlice';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import {Input, Button, Space, Typography, Card} from 'antd';

const {Title, Text} = Typography;

const OtpVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, otpArray, activeIndex} = useSelector((state) => state.otp);
  const {resetPasswordEmail} = useSelector((state) => state.forgotPassword);
  const inputRefs = useRef([]);

  // Auto-focus current input
  useEffect(() => {
    inputRefs.current[activeIndex]?.focus();
  }, [activeIndex]);

  // Handle typing
  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      dispatch(setOtpDigit({index, value}));
      if (value && index < 5) dispatch(setActiveIndex(index + 1));
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowLeft' && index > 0) dispatch(setActiveIndex(index - 1));
    if (e.key === 'ArrowRight' && otpArray[index] && index < 5) {
      dispatch(setActiveIndex(index + 1));
    }
    if (e.key === 'Backspace' && !otpArray[index] && index > 0) {
      dispatch(setActiveIndex(index - 1));
    }
  };

  // Paste OTP
  const handlePaste = (e, index) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').slice(0, 6).split('');
    const copy = [...otpArray];
    let count = 0;
    for (let i = index; i < copy.length && count < pasted.length; i++) {
      copy[i] = pasted[count++];
    }
    dispatch(setOtpArray(copy));
    dispatch(setActiveIndex(Math.min(index + pasted.length, otpArray.length - 1)));
  };

  // Submit OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = otpArray.join('');
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP', {toastId: 'verify'});
      return;
    }

    try {
      await dispatch(verifyOtp({email: resetPasswordEmail, otp})).unwrap();
      toast.success('OTP verified successfully!', {toastId: 'verify'});
      navigate('/reset-password');
      dispatch(resetOtpState());
    } catch {
      toast.error('Invalid OTP', {toastId: 'invalid'});
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[92.5vh] bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className="max-w-md w-full p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-6">
          <Title level={3}>Verify OTP</Title>
          <Text type="secondary">Enter the 6-digit OTP sent to your email.</Text>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Space size="small" className="w-full justify-between">
            {otpArray.map((digit, index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={(e) => handlePaste(e, index)}
                className="text-center text-lg font-semibold"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  fontSize: '18px',
                }}
              />
            ))}
          </Space>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            size="large"
          >
            Verify OTP
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default OtpVerification;
