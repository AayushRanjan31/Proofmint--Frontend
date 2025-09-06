import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {verifyOtp, setOtpDigit, setActiveIndex, setOtpArray} from '../redux/slices/otpSlice';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const OtpVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, otpArray, activeIndex} = useSelector((state) => state.otp);
  const inputRefs = useRef([]);

  // Auto-focus current active index
  useEffect(() => {
    inputRefs.current[activeIndex]?.focus();
  }, [activeIndex]);

  // Typing
  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      dispatch(setOtpDigit({index, value}));
      if (value && index < 5) {
        dispatch(setActiveIndex(index + 1));
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowLeft' && index > 0) {
      dispatch(setActiveIndex(index - 1));
    }
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

    const next = Math.min(index + pasted.length, otpArray.length - 1);
    dispatch(setActiveIndex(next));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = otpArray.join('');
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    dispatch(verifyOtp(otp))
        .unwrap()
        .then(() => {
          toast.success('OTP verified successfully!');
          navigate('/resetPassword');
        })
        .catch(() => {});
  };

  return (
    <div className="flex items-center justify-center min-h-[92.5vh] bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 m-3">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Verify OTP</h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter the 6-digit OTP sent to your email.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-between gap-2">
            {otpArray.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={(e) => handlePaste(e, index)}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-blue-600 rounded-lg font-medium
              hover:bg-blue-700 transition duration-200 shadow-md disabled:opacity-60"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
