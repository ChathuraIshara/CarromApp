import { useEffect, useState } from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { databases } from "../appwrite/config";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest"); // Default sort order
  const itemsPerPage = 7;

  const init = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASEID,
        import.meta.env.VITE_COLLECTIONID_MATCHES
      );
      let sortedMatches = response.documents;

      // Sort matches based on the selected sortOrder
      if (sortOrder === "newest") {
        sortedMatches = sortedMatches.sort(
          (a, b) => new Date(b.time) - new Date(a.time)
        );
      } else {
        sortedMatches = sortedMatches.sort(
          (a, b) => new Date(a.time) - new Date(b.time)
        );
      }

      setMatches(sortedMatches);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    init();
  }, [sortOrder]); // Re-fetch and sort matches when sortOrder changes

  // Calculate total pages
  const totalPages = Math.ceil(matches.length / itemsPerPage);

  // Get current page matches
  const indexOfLastMatch = currentPage * itemsPerPage;
  const indexOfFirstMatch = indexOfLastMatch - itemsPerPage;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg w-full">
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">All Matches</h2>
          <p className="text-[#16C098] hidden sm:block text-[14px]">
            Active Members
          </p>
        </div>
        <div className="px-6 ">
          <div className="w-full max-w-sm min-w-[200px] relative flex flex-col sm:flex-row gap-3 ">
            <div className="relative sm:block ">
              <Input label="Search" />
            </div>
            <div className="relative sm:block">
              <Select
                label="Select Version"
                value={sortOrder} // Set the default value
                onChange={(e) => setSortOrder(e)} // Update sortOrder on change
              >
                <Option value="newest">
                  Sort by : <span className="font-semibold">Newest</span>
                </Option>
                <Option value="oldest">
                  Sort by : <span className="font-semibold">Oldest</span>
                </Option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-fixed ">
          <thead>
            <tr>
              <th className="p-3 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-semibold leading-none text-[#7C838A]">
                  Date & Time
                </p>
              </th>
              <th className="p-3 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-semibold leading-none text-[#7C838A]">
                  Player #1 Score
                </p>
              </th>
              <th className="p-3 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-semibold leading-none text-[#7C838A]">
                  Player #2 Score
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentMatches.length > 0 ? (
              currentMatches.map((match, index) => {
                const { formattedDate, formattedTime } = formatDateTime(
                  match.time
                );
                return (
                  <tr
                    key={index}
                    className="hover:bg-slate-50 border-b border-slate-200"
                  >
                    <td className="p-3">
                      <p className="flex flex-col sm:flex-row text-sm text-slate-800">
                        <span>{formattedDate}</span>
                        <span className="ml-2 sm:ml-4">{formattedTime}</span>
                      </p>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-between lg:w-[70%] text-sm text-slate-500">
                        <span>{match.player1_name}</span>
                        <span className="font-semibold">
                          {match.player1_marks}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-between lg:w-[70%] text-sm text-slate-500">
                        <span>{match.player2_name}</span>
                        <span className="font-semibold">
                          {match.player2_marks}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-3 font-semibold">
                  No matches found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center px-4 py-5">
          <div className="text-sm hidden sm:block text-slate-500">
            Showing {indexOfFirstMatch + 1} to {indexOfLastMatch} of{" "}
            {matches.length} entries
          </div>
          <div className="flex space-x-1">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-black transition duration-200 ease"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => setCurrentPage(pageIndex + 1)}
                className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 ${
                  currentPage === pageIndex + 1
                    ? "bg-primarypurple border-slate-800 text-white"
                    : "bg-white border-slate-200"
                } rounded border hover:border-black transition duration-200 ease`}
              >
                {pageIndex + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:border-black transition duration-200 ease"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Matches;

function formatDateTime(isoString) {
  const dateObj = new Date(isoString);
  const formattedDate = dateObj.toLocaleDateString("en-GB");
  const formattedTime = dateObj.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  return { formattedDate, formattedTime };
}
