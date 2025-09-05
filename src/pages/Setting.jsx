import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../redux/slices/settingSlice';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Setting = () => {
  const {userName, userEmail}=useSelector((state)=>state.userDetails);
  const {theme} = useSelector((state) => state.settings);
  const [newPassword, setNewPassword] = useState('')
  const dispatch = useDispatch();
  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleNewPassword = () => {
    if (newPassword.length <=5) {
          toast.error('Password must be 6 characters.', { toastId: 'password-error' });
     }
  }

  return (
    <div className="mt-20 md:flex md:justify-center md:ml-70 md:mt-10">
      <div
        className={'m-8 p-10 shadow rounded-xl md:w-[50vw] bg-[var(--component-bg)] text-[var(--text-color)]'}
      >
        <div className="flex flex-col">
          <p className="pb-1 md:text-5xl text-4xl font-bold">Settings</p>
          <div>
            <h3 className="mt-4 mb-3 text-lg font-semibold">
                            Profile
            </h3>
            <div className="flex flex-col gap-2">
               <input
                type="text"
                value={userName}
                className="w-full p-2 border rounded-lg"
                disabled
              />
                <input
                type="text"
                value={userEmail}
                className="w-full p-2 border rounded-lg"
                disabled
              />
            </div>
          </div>

            <div>
            <h3 className="mt-4 mb-3 text-lg font-semibold">
                            Security
            </h3>
            <div className="flex flex-col gap-3">
               <input
                type="text"
                value={newPassword}
                className="w-full p-2 border rounded-lg"
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='New Password'
              />
                <button
          className="py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded cursor-pointer w-[160px]"
          onClick={() => handleNewPassword()}
        >
       Change Password
        </button>
            </div>
          </div>

          <div>
            <h3 className="mt-4 mb-3 text-lg font-semibold">
                            Preferences
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-lg font-medium">Light</span>
              <button
                onClick={() => handleToggle()}
                className={`w-14 h-7 flex items-center rounded px-1 cursor-pointer ${
                                    theme == 'dark' ?
                                        'bg-gray-800' :
                                        'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5  bg-white rounded shadow-md transform transition-transform ${
                                        theme == 'dark' ?
                                            'translate-x-7' :
                                            'translate-x-0 '
                  }`}
                />
              </button>

              <span className="text-lg font-medium">Dark</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
