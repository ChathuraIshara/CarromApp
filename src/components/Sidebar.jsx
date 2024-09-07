import React from "react";
import { FaHome, FaUser, FaQuestionCircle, FaTimes } from "react-icons/fa";
import carromLogoName from "../assets/icons/carromLogoName.svg";
import DashboardIcon from "../assets/icons/key-square.svg";
import DashboardActiveIcon from "../assets/icons/key-square-active.svg";
import PlayersIcon from "../assets/icons/user-square.svg";
import PlayersActive from "../assets/icons/user-square-active.svg";
import MatchesIcon from "../assets/icons/3d-square.svg";
import MatchesIconActive from "../assets/icons/3d-square-active.svg";
import HelpIcon from "../assets/icons/message-question.svg";
import HelpActiveIcon from "../assets/icons/message-question-active.svg";
import profileImgIcon from "../assets/icons/evano.svg";
import { Button } from "@material-tailwind/react";
import {Avatar} from "@material-tailwind/react";
import {Typography} from "@material-tailwind/react";

const Sidebar = ({
  selectedItem,
  setSelectedItem,
  isSidebarOpen,
  toggleSidebar,
}) => {
  return (
    <div>
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      {console.log("inside sidebar open",isSidebarOpen)}
      <div
        className={`fixed h-full z-30 inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between p-4">
          <img src={carromLogoName}></img>
        </div>
        <ul className="relative px-4 space-y-4 top-5">
          <li
            onClick={() => {
              setSelectedItem(0);
            }}
            className={`flex gap-2 items-center p-2 text-gray-700 hover:shadow-lg rounded-lg hover:cursor-pointer ${
              selectedItem == 0
                ? "bg-primarypurple text-white"
                : "text-textsecondary bg-white"
            }`}
          >
            <img
              src={`${selectedItem == 0 ? DashboardActiveIcon : DashboardIcon}`}
              width={20}
              height={20}
            ></img>
            <span className="">Dashboard</span>
          </li>
          <li
            onClick={() => {
              setSelectedItem(1);
            }}
            className={`flex gap-2 items-center hover:cursor-pointer ${
              selectedItem == 1
                ? "bg-primarypurple text-white"
                : "text-textsecondary bg-white"
            } p-2 text-gray-700 hover:shadow-lg rounded-lg`}
          >
            <img
              src={`${selectedItem == 1 ? MatchesIconActive : MatchesIcon}`}
              width={20}
              height={20}
            ></img>
            <span>Matches</span>
          </li>
          <li
            onClick={() => {
              setSelectedItem(2);
            }}
            className={`flex gap-2 items-center p-2 hover:cursor-pointer ${
              selectedItem == 2
                ? "bg-primarypurple text-white"
                : "text-textsecondary bg-white"
            } hover:shadow-lg   rounded-lg`}
          >
            <img
              src={`${selectedItem == 2 ? PlayersActive : PlayersIcon}`}
              width={20}
              height={20}
            ></img>
            <span>Players</span>
          </li>
          <li
            onClick={() => {
              setSelectedItem(3);
            }}
            className={`flex gap-2 items-center p-2 hover:cursor-pointer ${
              selectedItem == 3
                ? "bg-primarypurple text-white"
                : "text-textsecondary bg-white"
            } hover:shadow-lg   rounded-lg`}
          >
            <img
              src={`${selectedItem == 3 ? HelpActiveIcon : HelpIcon}`}
              width={20}
              height={20}
            ></img>
            <span>Help</span>
          </li>
        </ul>
        <div className="absolute flex flex-col items-center justify-center w-full p-4 bottom-2 ">
          <Button onClick={()=>{setSelectedItem(4)}}
            className={`flex items-center w-24 h-24 rounded-full capitalize bg-transparent text-textprimary `}
            fullWidth
          >
            <Avatar
              src={profileImgIcon}
              alt="avatar"
              variant="square"
              className="scale-150"
            />
          </Button>
          <Typography color="inherit" className="font-bold capitaliz">
            Evano
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
