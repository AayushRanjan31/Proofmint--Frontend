import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword} from '../redux/slices/resetPasswordSlice';
import {toast} from 'react-toastify';
import {useParams} from 'react-router-dom';
import {Lock} from 'lucide-react';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const {token} = useParams();
  const {loading} = useSelector((state) => state.resetPassword);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Regex for strong password
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      toast.error(
          'Password must be at least 8 characters, include 1 number, 1 letter, and 1 special character',
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    dispatch(resetPassword({token, newPassword}))
        .unwrap()
        .then(() => {
          toast.success('Password reset successfully!');
        })
        .catch(() => {});
  };

  return (
    <div className="flex items-center justify-center min-h-[92.5vh] bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 m-3">
        <div className="text-center mb-6">
          <Lock className="w-10 h-10 text-purple-600 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-2">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-500 focus:border-transparent
              shadow-sm text-gray-700 placeholder-gray-400"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-500 focus:border-transparent
              shadow-sm text-gray-700 placeholder-gray-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-purple-600 rounded font-medium
              hover:bg-purple-700 transition duration-200 shadow-md disabled:opacity-60"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
