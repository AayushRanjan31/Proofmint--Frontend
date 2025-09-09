import {Result, Button} from 'antd';
import {Link} from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Result
        status="404"
        title="404"
        subTitle="Oops! The page you are looking for does not exist."
        extra={
          <Button type="primary">
            <Link to="/" className="!no-underline text-white">
              Go Back Home
            </Link>
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
