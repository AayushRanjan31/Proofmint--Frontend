import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/slices/settingSlice";
const Setting = () => {
   const {theme}=useSelector(state=>state.Settings)
   const dispatch=useDispatch()
  const handleToggle = () => {
    let newTheme=theme==="light"?"dark":"light"
    dispatch(setTheme(newTheme))
    document.documentElement.classList.toggle("dark");
  };
  
  return (
    <div className='mt-20 md:flex md:justify-center md:ml-70 md:mt-10'>
    <div className={`m-8 p-10 shadow rounded-xl md:w-[50vw] ${theme=="dark"?"bg-gray-500 text-white":"bg-white"}`}>
      <div className="flex flex-col">
             <h1 className="font-semibold">Settings</h1>
        <div>
          <h3 className="mt-4 mb-3 text-lg font-semibold">Profile</h3>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="name"
              // value={form.name}
              className="w-full p-2 border rounded-lg"
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              // value={form.email}
              className="w-full p-2 border rounded-lg"
              placeholder="Email Address"
            />
          </div>
        </div>

     <div>
      <h3 className="mt-4 mb-3 text-lg font-semibold">Preferences</h3>
      <div className="flex items-center gap-3">
        <span className="text-lg font-medium">
           Light
        </span>
        <button
          onClick={handleToggle}
          className={`w-14 h-7 flex items-center rounded px-1 cursor-pointer ${
            theme == "dark" ? "bg-gray-800" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-5 h-5  bg-white rounded shadow-md transform transition-transform ${
              theme == "dark" ? "translate-x-7" : "translate-x-0 "
            }`}
          />
        </button>

        <span className="text-lg font-medium">
           Dark
        </span>
      </div>
    </div>
      </div>
    </div>
        </div>
  );
};

export default Setting;