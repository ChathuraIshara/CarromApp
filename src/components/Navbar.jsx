import React from "react";
import { FaBell, FaCog, FaSearch, FaBars } from "react-icons/fa";
import { Input } from "@material-tailwind/react";
import { databases } from "../../Appwrite/appwrite.config";
import { authUser } from "../../Appwrite/actions/auth";
import { useState, useEffect } from "react";

const Navbar = ({ toggleSidebar }) => {
  const [token, setToken] = useState("");
  const [loggedUserName, setLoggedUserName] = useState("User");

  const fetchUser = async (id) => {
    try {
      const response = await databases.getDocument(
        import.meta.env.VITE_DATABASEID, // Database ID
        import.meta.env.VITE_COLLECTIONID_PLAYERS, // Collection ID
        id // Document ID
      );
      // console.log('Document data:', response);
      //setDocument(response);  // Store the document data in state
      console.log("user", response);
      setLoggedUserName(response.name);
    } catch (err) {
      console.error("Failed to fetch document:", err);
    }
  };

  useEffect(() => {
    const userToken = authUser(); // Retrieve and decrypt the token using authUser
    if (userToken) {
      setToken(userToken); // Set the decrypted token in state
      console.log("token", userToken);
      fetchUser(userToken);
    }
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-4 md:px-14">
      <div className="flex items-center space-x-4">
        {/* Sidebar toggle button for mobile */}
        <h1 className="text-xl font-semibold">Hello {loggedUserName} 👋</h1>
      </div>

      <div className="flex items-center justify-end space-x-1 md:gap-7">
        <div className="relative hidden md:block ">
          <Input label="Search"></Input>
        </div>
        <div className="flex items-center gap-4 md:gap-7">
          <button
            className="text-textsecondary lg:hidden"
            onClick={toggleSidebar}
          >
            <FaBars size={20} />
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
