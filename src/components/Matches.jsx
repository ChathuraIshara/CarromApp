import { useEffect, useState } from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { databases } from "../../Appwrite/appwrite.config";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest"); // Default sort order
  const [searchQuery, setSearchQuery] = useState(""); // Add search query state

  const [filteredMatches, setFilteredMatches] = useState([]);
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
      setFilteredMatches(sortedMatches);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

 

  useEffect(() => {
    init();
  }, [sortOrder]); // Re-fetch and sort matches when sortOrder changes

  useEffect(() => {
    // Filter matches based on search query
    if (!matches.length) return;
    if (!searchQuery) return;

    const filtered = matches.filter((match) => {
      const searchLower = searchQuery.toLowerCase();

      if (!match.player1_name && !match.player2_name) return;
      return (
        match.player1_name.toLowerCase().includes(searchLower) ||
        match.player2_name.toLowerCase().includes(searchLower)
      );
    });
    setFilteredMatches(filtered);
  }, [searchQuery, matches]);

  // Calculate total pages based on filtered matches
  const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);

  // Get current page matches from filtered matches
  const indexOfLastMatch = currentPage * itemsPerPage;
  const indexOfFirstMatch = indexOfLastMatch - itemsPerPage;
  const currentMatches = filteredMatches.slice(
    indexOfFirstMatch,
    indexOfLastMatch
  );

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
    <div className="w-full p-4 bg-white rounded-lg">
      <div className="flex items-center justify-between w-full pl-3 mt-1 mb-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">All Matches</h2>
          <p className="text-[#16C098] hidden sm:block text-[14px]">
            Active Members
          </p>
        </div>
        <div className="px-6 ">
          <div className="w-full max-w-sm min-w-[200px] relative flex flex-col sm:flex-row gap-3 ">
            <div className="relative sm:block ">
              {/* Input for searching matches */}
              <Input
                label="Search by Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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

      <div className="relative flex flex-col w-full h-full pt-2 text-gray-700 rounded-lg shadow-md bg-clip-border">
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
                    className="border-b hover:bg-slate-50 border-slate-200"
                  >
                    <td className="p-3">
                      <p className="flex flex-col text-sm sm:flex-row text-slate-800">
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
                <td colSpan="3" className="p-3 font-semibold text-center">
                  No matches found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-4 py-5">
          <div className="hidden text-sm sm:block text-slate-500">
            Showing {indexOfFirstMatch + 1} to {indexOfLastMatch} of{" "}
            {filteredMatches.length} entries
          </div>
          <div className="flex space-x-1">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm font-normal transition duration-200 bg-white border rounded min-w-9 min-h-9 text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-black ease"
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
              className="px-3 py-1 text-sm font-normal transition duration-200 bg-white border rounded min-w-9 min-h-9 text-slate-500 border-slate-200 hover:border-black ease"
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
``;
