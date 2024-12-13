import React, { useState } from 'react';
import profileImageIcon from '../assets/icons/evano.svg';

const matches = [
  { id: 1, dateTime:'2024/10/12',opponent: 'Jane Cooper',opponentMarks: 11, yourMarks: 14, status: 'Won' },
  { id: 2, dateTime:'2024/10/12',opponent: 'Floyd Miles', frames: 5, yourMarks: 15, opponentMarks: 25, points: '-4', status: 'Defeat' },
  { id: 1, dateTime:'2024/10/12',opponent: 'Jane Cooper', frames: 4, yourMarks: 14, opponentMarks: 11, points: '+2', status: 'Won' },
  { id: 2, dateTime:'2024/10/12',opponent: 'Floyd Miles', frames: 5, yourMarks: 15, opponentMarks: 25, points: '-4', status: 'Defeat' },
  
  // ... other matches
];

const PAGE_SIZE = 2;

function Profile() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(matches.length / PAGE_SIZE);

  const currentMatches = matches.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-8">
        <div className="flex items-center justify-center w-24 h-24 mr-6 bg-blue-500 rounded-full">
          <img 
            src={profileImageIcon}
            alt="Profile" 
            className="object-cover w-24 h-24 rounded-full" 
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">Joe Mallfoe</h2>
          <p className="text-gray-600">220937G</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm text-gray-500">Faculty</label>
              <input type="text" value="IT Faculty" className="w-full p-2 text-sm border rounded-lg" disabled />
            </div>
            <div>
              <label className="block text-sm text-gray-500">Gender</label>
              <input type="text" value="Female" className="w-full p-2 text-sm border rounded-lg" disabled />
            </div>
            <div>
              <label className="block text-sm text-gray-500">WhatsApp Number</label>
              <input type="text" value="0773268793" className="w-full p-2 text-sm border rounded-lg" disabled />
            </div>
            <div>
              <label className="block text-sm text-gray-500">District</label>
              <input type="text" value="Colombo" className="w-full p-2 text-sm border rounded-lg" disabled />
            </div>
          </div>
        </div>
        {/* <div className="ml-auto flex space-x-2 mt-[3rem]">
          <button className="flex items-center px-4 py-2 text-sm text-white bg-purple-500 rounded-lg">
            <i className="mr-2 fas fa-eye"></i> View
          </button>
          <button className="flex items-center px-4 py-2 text-sm text-white bg-purple-500 rounded-lg">
            <i className="mr-2 fas fa-edit"></i> Edit
          </button>
        </div> */}
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Matches</h2>
            <h6 className="text-xs text-[#16C098]">Active Members</h6>
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:border-black"
            />
            <select className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:border-black">
              <option>Sort by: Newest</option>
              <option>Sort by: Oldest</option>
            </select>
          </div>
        </div>

        <table className="min-w-full bg-white">
          <thead>
            <tr>
            <th className="px-4 py-2 text-sm font-semibold text-left text-gray-600">Date&Time</th>
              <th className="px-4 py-2 text-sm font-semibold text-left text-gray-600">Opponent Name</th>
              <th className="px-4 py-2 text-sm font-semibold text-left text-gray-600">Opponent's Mark</th>
              <th className="px-4 py-2 text-sm font-semibold text-left text-gray-600">Your Marks</th> 
              <th className="px-4 py-2 text-sm font-semibold text-left text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentMatches.map((match) => (
              <tr key={match.id} className="border-t">
                 <td className="px-4 py-2 text-sm text-gray-700">{match.dateTime}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{match.opponent}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{match.opponentMarks}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{match.yourMarks}</td>
                <td className="px-4 py-2 text-sm">
                  <span className={`px-2 py-1 rounded ${match.status === 'Won' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {match.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button onClick={handlePrevious} disabled={currentPage === 1} className="px-3 py-1 text-sm border rounded-lg">
            Prev
          </button>
          <div className="flex space-x-1">{Array.from({ length: totalPages }).map((_, i) => (
            <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={`px-2 py-1 text-sm rounded-lg ${currentPage === i + 1 ? 'bg-purple-500 text-white' : 'bg-white border'}`}>
              {i + 1}
            </button>
          ))}</div>
          <button onClick={handleNext} disabled={currentPage === totalPages} className="px-3 py-1 text-sm border rounded-lg">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
