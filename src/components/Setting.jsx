import { useState } from "react";

const Setting = () => {
   const [theme, setTheme] = useState("light");

  const handleToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className=" m-8 p-6 bg-white shadow rounded-2xl">
      <div className="flex flex-col gap-2">
             <h1 className="text-2xl font-bold ">Settings</h1>
        <div>
          <h3 className="text-lg font-semibold mb-2 mt-4">Profile</h3>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="name"
              // value={form.name}
              className="w-full border p-2 rounded-lg"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              // value={form.email}
              className="w-full border p-2 rounded-lg"
              placeholder="Email Address"
            />
          </div>
        </div>

     <div>
      <h3 className="text-lg font-semibold mb-2 mt-4">Preferences</h3>
      <div className="flex items-center gap-3">
        <span className="text-lg font-medium">
           Light
        </span>
        <button
          onClick={handleToggle}
          className={`w-14 h-7 flex items-center rounded px-1 cursor-pointer ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded shadow-md transform transition-transform ${
              theme === "dark" ? "translate-x-7" : "translate-x-0"
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
  );
};

export default Setting;


