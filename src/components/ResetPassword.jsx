import {useDispatch, useSelector} from 'react-redux';
import {
  resetPassword,
  setConfirmPassword,
  setNewPassword,
} from '../redux/slices/resetPasswordSlice';
import {toast} from 'react-toastify';
import {LockOutlined} from '@ant-design/icons';
import {Input, Button, Card, Typography} from 'antd';
import {useNavigate} from 'react-router-dom';

const {Title, Text} = Typography;

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {resetPasswordEmail} = useSelector((state) => state.forgotPassword);
  const {loading, newPassword, confirmPassword} = useSelector(
      (state) => state.resetPassword,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error('All fields are required', {toastId: 'fields'});
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match', {toastId: 'password'});
      return;
    }

    dispatch(resetPassword({email: resetPasswordEmail, newPassword}))
        .unwrap()
        .then(() => {
          toast.success('Password reset successfully!', {toastId: 'password1'});
          navigate('/');
          dispatch(setConfirmPassword(''));
          dispatch(setNewPassword(''));
        })
        .catch((err) => {
          toast.error(err, {toastId: 'error'});
        });
  };

  return (
    <div className="flex items-center justify-center min-h-[92.5vh] bg-gradient-to-br from-blue-50 to-blue-100">
      <Card
        className="max-w-md w-full p-8 rounded-2xl shadow-xl"
        bordered={false}
      >
        <div className="text-center mb-6">
          <LockOutlined style={{fontSize: 40, color: '#7c3aed'}} />
          <Title level={3} className="mt-2">
            Reset Password
          </Title>
          <Text type="secondary">
            Enter your new password below.
          </Text>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input.Password
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => dispatch(setNewPassword(e.target.value))}
            size="large"
            prefix={<LockOutlined />}
            required
          />
          <Input.Password
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
            size="large"
            prefix={<LockOutlined />}
            required
          />
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            Reset Password
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
