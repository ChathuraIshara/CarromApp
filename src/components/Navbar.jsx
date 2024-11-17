import React from 'react';
import { FaBell, FaCog, FaSearch, FaBars } from 'react-icons/fa';
import { Input } from '@material-tailwind/react';


const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="flex items-center justify-between px-4 py-4 md:px-14">
      <div className="flex items-center space-x-4">
        {/* Sidebar toggle button for mobile */}
        <h1 className="text-xl font-semibold">Hello Evano 👋</h1>
      </div>

      <div className="flex items-center justify-end space-x-1 md:gap-7">
        <div className="relative hidden md:block ">
         <Input label='Search'></Input>
        </div>
        <div className='flex items-center gap-4 md:gap-7'>
        <button className="text-textsecondary md:hidden" onClick={toggleSidebar}>
          <FaBars size={20}  />
        </button>
        <FaBell className="text-gray-600 text-textsecondary md:text-lg" />
        <FaCog className="text-gray-600 text-textsecondary md:text-lg" />

        </div>
       
        {/* <button className="px-4 py-2 text-white bg-purple-500 rounded-lg">
          Sign In
        </button> */}
      </div>
    </div>
  );
};

export default Navbar;
