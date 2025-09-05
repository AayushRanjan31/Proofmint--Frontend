import SearchOffIcon from '@mui/icons-material/SearchOff';
import {Link} from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <SearchOffIcon className="text-gray-400 mb-4 text-[100px]" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-6">Oops! The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition !no-underline"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
