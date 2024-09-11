import React from "react";
import { Input, Select, Option } from "@material-tailwind/react";

function Matches() {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">All Matches</h2>
          <p className="text-[#16C098] hidden sm:block text-[14px]">
            Active Members
          </p>
        </div>
        <div className="px-6 ">
          <div className="w-full max-w-sm min-w-[200px] relative flex flex-row gap-3 ">
            <div className="relative  sm:block ">
              <Input label="Search"></Input>
            </div>
            <div className="relative hidden sm:block">
              <Select label="Select Version">
                <Option>
                  Sort by : <span className="font-semibold">Newest</span>
                </Option>
                <Option>
                  Sort by : <span className="font-semibold">Oldest</span>
                </Option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-3 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-semibold leading-none text-[#7C838A]">
                  Date & Time
                </p>
              </th>
              <th className="py-3 border-b border-slate-200 bg-slate-50 ">
                <p className="text-sm font-semibold leading-none text-[#7C838A]">
                  Player #1 Score
                </p>
              </th>
              <th className="py-3 border-b border-slate-200 bg-slate-50 ">
                <p className="text-sm font-semibold leading-none text-[#7C838A]">
                  Player #2 Score
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-3">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1001
                </p>
              </td>
              <td className="py-3">
                <p className="text-sm text-slate-500">John Doe</p>
              </td>
              <td className="py-3">
                <p className="text-sm text-slate-500">$1,200.00</p>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-3">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1002
                </p>
              </td>
              <td className="py-3">
                <p className="text-sm text-slate-500">Jane Smith</p>
              </td>
              <td className="py-3">
                <p className="text-sm text-slate-500">$850.00</p>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-3">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1003
                </p>
              </td>
              <td className="py-3">
                <p className="text-sm text-slate-500">Acme Corp</p>
              </td>
              <td className="py-3">
                <p className="text-sm text-slate-500">$2,500.00</p>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-3">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1004
                </p>
              </td>
              <td className="py-3">
                <p className="text-sm text-slate-500">Global Inc</p>
              </td>
              <td className="py-3">
                <p className="text-sm text-slate-500">$4,750.00</p>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-3">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1004
                </p>
              </td>
              <td className="py-3">
                <p className="text-sm text-slate-500">Global Inc</p>
              </td>
              <td className="py-3">
                <p className="text-sm text-slate-500">$4,750.00</p>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-3">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1004
                </p>
              </td>
              <td className="py-3">
                <p className="text-sm text-slate-500">Global Inc</p>
              </td>
              <td className="py-3">
                <p className="text-sm text-slate-500">$4,750.00</p>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-3">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1004
                </p>
              </td>
              <td className="py-3">
                <p className="text-sm text-slate-500">Global Inc</p>
              </td>
              <td className="py-3">
                <p className="text-sm text-slate-500">$4,750.00</p>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between items-center px-4 py-5">
          <div className="text-sm hidden sm:block text-slate-500">
            Showing data 1 to 7 of 256k entries
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-black transition duration-200 ease">
              Prev
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-slate-800 border border-slate-800 rounded hover:text-white hover:bg-primarypurple hover:border-slate-600 transition duration-200 ease">
              1
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:text-white hover:bg-primarypurple hover:border-slate-400 transition duration-200 ease">
              2
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:text-white hover:bg-primarypurple hover:border-slate-400 transition duration-200 ease">
              3
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:border-black transition duration-200 ease">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Matches;
