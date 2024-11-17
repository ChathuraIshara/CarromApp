import React, { useState } from 'react';

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Example total pages, adjust based on your data

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const renderPagination = () => {
    return Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => setCurrentPage(index + 1)}
        className={`px-2 py-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'} transition-all`}
      >
        {index + 1}
      </button>
    ));
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-20 sm:w-64 bg-white flex-shrink-0 flex flex-col items-center sm:items-start p-4 space-y-4 border-r border-gray-200">
        <div className="flex items-center justify-center sm:justify-start space-x-2">
          <img src="/path-to-logo.png" alt="Logo" className="h-8 w-8" />
          <span className="hidden sm:block text-lg font-bold">MORA CARROM</span>
        </div>
        <nav className="flex flex-col items-center sm:items-start space-y-2">
          <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-black">
            <i className="icon-dashboard"></i> {/* Add icons if needed */}
            <span className="hidden sm:block">Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-black">
            <i className="icon-matches"></i>
            <span className="hidden sm:block">Matches</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-black">
            <i className="icon-players"></i>
            <span className="hidden sm:block">Players</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-black">
            <i className="icon-help"></i>
            <span className="hidden sm:block">Help</span>
          </a>
        </nav>
        <div className="mt-auto">
          <img src="/path-to-user.jpg" alt="Profile" className="h-12 w-12 rounded-full" />
          <p className="hidden sm:block text-center font-bold">Evano</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Your table and other content */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                {/* Add your table headers */}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {/* Map over your data to render table rows */}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex gap-2 mb-2 sm:mb-0">
            <button
              onClick={handlePrevious}
              className={`px-2 py-1 border rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'} transition-all`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {renderPagination()}
            <button
              onClick={handleNext}
              className={`px-2 py-1 border rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'} transition-all`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <p className="text-sm text-gray-500">Page {currentPage} of {totalPages}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
