import React, { useState } from 'react';

const matches = [
  { id: 1, opponent: 'Jane Cooper', frames: 4, yourMarks: 14, opponentMarks: 11, points: '+2', status: 'Won' },
  { id: 2, opponent: 'Floyd Miles', frames: 5, yourMarks: 15, opponentMarks: 25, points: '-4', status: 'Defeat' },
  { id: 3, opponent: 'Ronald Richards', frames: 8, yourMarks: 16, opponentMarks: 25, points: '-5', status: 'Defeat' },
  { id: 4, opponent: 'Marvin McKinney', frames: 6, yourMarks: 24, opponentMarks: 12, points: '+5', status: 'Won' },
  { id: 5, opponent: 'Jerome Bell', frames: 4, yourMarks: 25, opponentMarks: 12, points: '+5', status: 'Active' },
  { id: 6, opponent: 'Kathryn Murphy', frames: 6, yourMarks: 25, opponentMarks: 14, points: '+7', status: 'Active' },
  { id: 7, opponent: 'Jacob Jones', frames: 8, yourMarks: 17, opponentMarks: 15, points: '+3', status: 'Active' },
  { id: 8, opponent: 'Kristin Watson', frames: 8, yourMarks: 16, opponentMarks: 28, points: '-3', status: 'Inactive' },
];

const PAGE_SIZE = 8;

export const Profile = () =>{
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

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`px-2 py-1 border rounded-lg ${currentPage === i ? 'bg-[#5932EA] text-white' : 'text-gray-700 hover:bg-gray-200'} transition-all`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex items-center mb-8 bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-center bg-blue-500 rounded-full w-40 h-40 mr-6">
          {/* Profile Picture - Replace placeholder with actual image source */}
          {/* TODO: Implement profile picture upload functionality here */}
          <img 
            src="https://images.app.goo.gl/Z4THAKdtqpuDhCvA8" 
            alt="Profile" 
            className="w-32 h-32 rounded-full" 
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">Joe Mallfoe</h2>
          <p className="text-gray-600">220937G</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-500 text-sm">Faculty</label>
              <input type="text" value="IT Faculty" className="border rounded-lg p-2 w-60 text-sm w-full" disabled />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-500 text-sm">Gender</label>
              <input type="text" value="Female" className="border rounded-lg p-2 w-60 text-sm w-full" disabled />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-500 text-sm">Whatsapp Number</label>
              <input type="text" value="0773268793" className="border rounded-lg p-2 w-60 text-sm w-full" disabled />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-500 text-sm">District</label>
              <input type="text" value="Colombo" className="border rounded-lg p-2 w-60 text-sm w-full" disabled />
            </div>
          </div>
        </div>
        <div className="ml-auto flex p-6 mt-[4rem]">
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg mr-2 flex items-center">
            <i className="fas fa-eye mr-2"></i> View
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center">
            <i className="fas fa-edit mr-2"></i> Edit
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-900">All Matches</h2>
            <h6 className="text-[12px] text-[#16C098]">Active Members</h6>
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-black"
            />
            <select className="ml-4 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-500 focus:border-black transition-all">
              <option className="text-gray-500">Sort by: Newest</option>
              <option className="text-gray-500">Sort by: Oldest</option>
            </select>
          </div>
        </div>

        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Opponent Name</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Frames</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Your Marks</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Opponent's Mark</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Points</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentMatches.map((match) => (
              <tr key={match.id} className="border-t">
                <td className="py-3 px-4 text-sm text-gray-700">{match.opponent}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{match.frames}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{match.yourMarks}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{match.opponentMarks}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{match.points}</td>
                <td className="py-3 px-4 text-sm">
                  <span className={`px-4 py-1 w-20 inline-block text-center rounded-lg text-white ${match.status === 'Won' ? 'bg-green-500' : match.status === 'Defeat' ? 'bg-red-500' : match.status === 'Active' ? 'bg-blue-500' : 'bg-gray-500'}`}>
                    {match.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-[12px] text-gray-600">
            Showing data {(currentPage - 1) * PAGE_SIZE + 1} to {Math.min(currentPage * PAGE_SIZE, matches.length)} of {matches.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              className={`px-2 py-1 border rounded-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'} transition-all`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {renderPagination()}
            <button
              onClick={handleNext}
              className={`px-2 py-1 border rounded-lg ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'} transition-all`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
