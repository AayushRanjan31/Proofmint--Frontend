import {useSelector, useDispatch} from 'react-redux';
import {setLoginEmail, setLoginPassword, setLoggedIn, loginUser} from '../redux/slices/authSlice';
import {setResetPasswordEmail} from '../redux/slices/forgetPasswordSlice';
import {toast} from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';
import {Form, Input, Button, Typography} from 'antd';

const {Title, Text} = Typography;

const LoginPage = () => {
  const {loginEmail, loginPassword} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (loginPassword.length < 8) {
      toast.error('Password must be 8 characters.', {toastId: 'fetch-error'});
      return;
    }

    const res = await dispatch(loginUser({loginEmail, loginPassword}));
    if (res.payload?.status === true) {
      dispatch(setLoggedIn(true));
      navigate('/');
    } else {
      toast.error(res.payload?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[81vh]">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-xl m-3">
        <div className="flex flex-col items-center mb-6">
          <Title level={2} className="text-gray-800">ProofMint</Title>
          <Title level={4} className="text-gray-700 mt-2">Login</Title>
        </div>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Email" required>
            <Input
              type="email"
              placeholder="Enter your email"
              value={loginEmail}
              onChange={(e) => dispatch(setLoginEmail(e.target.value))}
            />
          </Form.Item>
          <Form.Item label="Password" required>
            <Input.Password
              placeholder="Enter your password"
              value={loginPassword}
              onChange={(e) => dispatch(setLoginPassword(e.target.value))}
            />
            <div className="text-right mt-1">
              <Link
                to="/forgetPassword"
                onClick={() => dispatch(setResetPasswordEmail(''))}
                className="text-blue-600 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
          <Text>
            Don&apos;t have an account? &nbsp;
            <Link to="/signUp" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </Text>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
