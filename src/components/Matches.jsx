import React, { useState } from "react";

const matches = [
  {
    id: 1,
    date: "20/09/2024",
    time: "15:08 PM",
    player1: "Samitha Wijenayake",
    player1Score: 10,
    player2: "Booshana Namudara",
    player2Score: 25,
  },
  {
    id: 2,
    date: "20/09/2024",
    time: "16:00 PM",
    player1: "John Doe",
    player1Score: 14,
    player2: "Michael Johnson",
    player2Score: 18,
  },
  {
    id: 3,
    date: "20/09/2024",
    time: "17:30 PM",
    player1: "Alice Brown",
    player1Score: 19,
    player2: "Emma Wilson",
    player2Score: 21,
  },
  {
    id: 4,
    date: "20/09/2024",
    time: "18:00 PM",
    player1: "Robert Lee",
    player1Score: 23,
    player2: "David Kim",
    player2Score: 19,
  },
];

const PAGE_SIZE = 8; // Number of matches per page

export function Matches() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(matches.length / PAGE_SIZE);

  // Get matches for the current page
  const currentMatches = matches.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Handle page change
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

    // Always show the 1st page
    pages.push(
      <button
        key={1}
        className={`px-2 py-0.5 border rounded-lg ${
          currentPage === 1
            ? "bg-[#5932EA] text-white"
            : "text-gray-700 hover:bg-gray-200"
        } transition-all`}
        onClick={() => handlePageChange(1)}
      >
        1
      </button>
    );

    // Always show the 2nd page if totalPages > 1
    if (totalPages > 1) {
      pages.push(
        <button
          key={2}
          className={`px-2 py-0.5 border rounded-lg ${
            currentPage === 2
              ? "bg-[#5932EA] text-white"
              : "text-gray-700 hover:bg-gray-200"
          } transition-all`}
          onClick={() => handlePageChange(2)}
        >
          2
        </button>
      );
    }

    // Show ellipsis if there are more pages between the current page and the 2nd page
    if (currentPage > 3 && totalPages > 3) {
      pages.push(
        <span key="ellipsis1" className="px-3 py-1 text-gray-700">
          ...
        </span>
      );
    }

    // Show the current page if it's beyond the first two pages
    if (currentPage > 2 && currentPage < totalPages) {
      pages.push(
        <button
          key={currentPage}
          className="px-2 py-0.5 border rounded-lg bg-[#5932EA] text-white transition-all"
          onClick={() => handlePageChange(currentPage)}
        >
          {currentPage}
        </button>
      );
    }

    // Show ellipsis if there are more pages between the current page and the last page
    if (currentPage < totalPages - 1 && totalPages > 3) {
      pages.push(
        <span key="ellipsis2" className="px-2 py-0.5 text-gray-700">
          ...
        </span>
      );
    }

    // Always show the last page if totalPages > 2
    if (totalPages > 2) {
      pages.push(
        <button
          key={totalPages}
          className={`px-2 py-0.5 border rounded-lg ${
            currentPage === totalPages
              ? "bg-[#5932EA] text-white"
              : "text-gray-700 hover:bg-gray-200"
          } transition-all`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-900">All Matches</h2>
            <h6 className="text-[12px] text-[#16C098]">Active Members</h6>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-black "
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
              <th className="text-left py-3 px-10 font-semibold text-sm text-gray-600">
                Date & Time
              </th>
              <th className="text-left py-3 px-10 font-semibold text-sm text-gray-600">
                Player #1 Score
              </th>
              <th className="text-left py-3 px-10 font-semibold text-sm text-gray-600">
                Player #2 Score
              </th>
            </tr>
          </thead>
          <tbody>
            {currentMatches.map((match) => (
              <tr key={match.id} className="border-t">
                <td className="py-3 px-10 text-sm text-gray-700">
                  {match.date} {match.time}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  <div className="grid grid-cols-2 gap-2">
                    <span>{match.player1}</span>
                    <span className="px-10  font-semibold">
                      {match.player1Score}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  <div className="grid grid-cols-2 gap-2">
                    <span>{match.player2}</span>
                    <span className="px-10 font-semibold">
                      {match.player2Score}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-[12px] text-gray-600">
            Showing data 1 to 8 of 256K entries
            {/* Showing page {currentPage} of {totalPages} */}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              className={`px-2 py-0.5 border rounded-lg text-gray-700  hover:bg-gray-200 transition-all`}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {renderPagination()}
            <button
              onClick={handleNext}
              className={`px-2 py-0.5 border rounded-lg text-gray-700  hover:bg-gray-200 transition-all`}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Matches;
