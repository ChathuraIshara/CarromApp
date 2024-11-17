import React, { useState,useEffect } from 'react';
import { Input } from "@material-tailwind/react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Query } from 'appwrite';
import {databases} from '../../Appwrite/appwrite.config';

function Players() {
  const [searchPlayer1, setSearchPlayer1] = useState('');
  const [searchPlayer2, setSearchPlayer2] = useState('');
  const [filteredPlayers1, setFilteredPlayers1] = useState([]);
  const [filteredPlayers2, setFilteredPlayers2] = useState([]);
  const [player1Data, setPlayer1Data] = useState(null);
  const [player2Data, setPlayer2Data] = useState(null);
  const [players,setPlayers]=useState([]);
  const [isMatchAvailable,setIsMatchAvailable]=useState(false);
  const [compMatches,setCompMatches]=useState([]);

  // const players = [
  //   { id: 1, name: 'Natalie Paisley', gender: 'female', matchDate: '2024/02/12', matchPoints: [20], oppositionPlayerId: 2 },
  //   { id: 2, name: 'John Doe', gender: 'male', matchDate: '2024/02/12', matchPoints: [12], oppositionPlayerId: 1 },
  //   { id: 3, name: 'Jane Smith', gender: 'female', matchDate: '2024/04/05', matchPoints: [17], oppositionPlayerId: 1 },
  // ];

  const fetchAllUsers = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASEID, // Your Database ID
        import.meta.env.VITE_COLLECTIONID_PLAYERS ,// Your Collection ID (players)
        [Query.limit(100)] // Increase limit (maximum is 100)
      );
      console.log('kal',response.documents)
      setPlayers(response.documents); // Array of users
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    getMatchesBetweenPlayers(searchPlayer1,searchPlayer2);
  }, [searchPlayer1,searchPlayer2]);

  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}/${month}/${day}`;
  };
  

  const handleSubmit=()=>
  {
    getMatchesBetweenPlayers(searchPlayer1,searchPlayer2);
  }

  const rearrangeMatches = (combinedMatches, player1Name, player2Name) => {
    return combinedMatches.map(match => {
      // Check if player1_name in the match equals the provided player1Name
      if (match.player1_name === player1Name && match.player2_name === player2Name) {
        // Match is already in the correct order, return as is
        return match;
      } 
      // If the match is reversed (player1_name is player2Name and player2_name is player1Name)
      else if (match.player1_name === player2Name && match.player2_name === player1Name) {
        // Swap the players and marks so player1 is always the given player1Name
        return {
          player1_name: match.player2_name,
          player1_marks: match.player2_marks,
          player2_name: match.player1_name,
          player2_marks: match.player1_marks,
          time: match.time // Keep other fields like time unchanged
        };
      }
      // Return the match if it's already in the correct form or doesn't need adjustment
      return match;
    });
  };
  

  const getMatchesBetweenPlayers = async ( player1Name, player2Name) => {
    try {
      // Fetch matches where the user is player 1
      const player1Matches = await databases.listDocuments(
        import.meta.env.VITE_DATABASEID,
        import.meta.env.VITE_COLLECTIONID_MATCHES,
        [Query.equal("player1_name", [player1Name]), Query.equal("player2_name", [player2Name])]
      );
  
    
      // Fetch matches where the user is player 2
      const player2Matches = await databases.listDocuments(
        import.meta.env.VITE_DATABASEID,
        import.meta.env.VITE_COLLECTIONID_MATCHES,
        [Query.equal("player1_name", [player2Name]), Query.equal("player2_name", [player1Name])]
      );

      const combinedMatches = [...player1Matches.documents, ...player2Matches.documents];
      const rearrangedMatches = rearrangeMatches(combinedMatches, player1Name, player2Name);
      setCompMatches(rearrangedMatches);
      setIsMatchAvailable(true);

  
     console.log('1',player1Matches);
     console.log('2',player2Matches);
  
    
    } catch (error) {
      console.error('Error fetching match data:', error);
      return null;
    }
  };

  

  const handleSearchPlayer1 = (searchValue) => {
    setSearchPlayer1(searchValue);
    const filtered = players.filter(p => p.name.toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredPlayers1(filtered);
  };

  const handleSearchPlayer2 = (searchValue) => {
    setSearchPlayer2(searchValue);
    const filtered = players.filter(p => p.name.toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredPlayers2(filtered);
  };

  const selectPlayer1 = (player) => {
    setPlayer1Data(player);
    setSearchPlayer1(player.name);
    setFilteredPlayers1([]);
  };

  const selectPlayer2 = (player) => {
    setPlayer2Data(player);
    setSearchPlayer2(player.name);
    setFilteredPlayers2([]);
  };

  const isOppositionMatch = player1Data && player2Data && player1Data.oppositionPlayerId === player2Data.id;
  const isDropdownOpen = filteredPlayers1.length > 0 || filteredPlayers2.length > 0;

  return (
    <div className="p-6 bg-white rounded-lg head">
      <div className="flex w-full gap-6 mt-1 mb-3 lg:flex-row">
        <div className="relative w-full lg:w-1/2">
          <Input
            label="Search Player "
            value={searchPlayer1}
            onChange={(e) => handleSearchPlayer1(e.target.value)}
          />
          {filteredPlayers1.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg">
              {filteredPlayers1.map((player) => (
                <div
                  key={player.id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => selectPlayer1(player)}
                >
                  {player.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative w-full lg:w-1/2">
          <Input
            label="Search Player "
            value={searchPlayer2}
            onChange={(e) => handleSearchPlayer2(e.target.value)}
          />
          {filteredPlayers2.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg">
              {filteredPlayers2.map((player) => (
                <div
                  key={player.id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => selectPlayer2(player)}
                >
                  {player.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        className={`w-full flex lg:flex-row gap-4 mb-3 mt-1 transition-all duration-200 ease-in-out 
          ${isDropdownOpen ? 'blur-md pointer-events-none opacity-50' : ''
          }`}
      >
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <Card className="w-40">
            <CardBody className="flex flex-col items-center p-2 text-center">
              {player1Data ? (
                <>
                  <img
                    src={
                      player1Data.gender === 'male'
                        ? 'https://docs.material-tailwind.com/img/team-2.jpg'
                        : 'https://docs.material-tailwind.com/img/team-1.jpg'
                    }
                    alt="profile-picture"
                    className="object-cover w-24 h-24 mb-2 rounded-full"
                  />
                  <Typography variant="h6" color="blue-gray" className="text-sm">
                    {player1Data.name}
                  </Typography>
                </>
              ) : (
                <Typography variant="h6" color="blue-gray" className="text-sm">
                  <div className="relative w-24 h-24 mb-2 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg
                      className="absolute w-24 h-24 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  No Player
                </Typography>
              )}
            </CardBody>
          </Card>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <Card className="w-40">
            <CardBody className="flex flex-col items-center p-2 text-center">
              {player2Data ? (
                <>
                  <img
                    src={
                      player2Data.gender === 'male'
                        ? 'https://docs.material-tailwind.com/img/team-2.jpg'
                        : 'https://docs.material-tailwind.com/img/team-1.jpg'
                    }
                    alt="profile-picture"
                    className="object-cover w-24 h-24 mb-2 rounded-full"
                  />
                  <Typography variant="h6" color="blue-gray" className="text-sm">
                    {player2Data.name}
                  </Typography>
                </>
              ) : (
                <Typography variant="h6" color="blue-gray" className="text-sm">
                  <div className="relative w-24 h-24 mb-2 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg
                      className="absolute w-24 h-24 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  No Player
                </Typography>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
      {isMatchAvailable && (
  <div
    className={`w-full flex flex-col mt-6 transition-all duration-200 ease-in-out ${isDropdownOpen ? 'blur-md pointer-events-none opacity-50' : ''
      }`}
  >
    <div className="flex items-center justify-between mb-3">
      <Typography variant="h5" color="blue-gray" className="text-lg">
        Match Details
      </Typography>
    </div>
    <div className="mt-0">
      <Typography variant="h6" color={isOppositionMatch ? "black" : "red"}>
        {compMatches.length > 0 ? (
          <div className="py-2">
            <div className="flex flex-wrap items-center justify-between py-2 border-b last:border-b-0">
              <div className="w-4/12 px-5 text-center text-slate-800">
                <div>Date</div>
              </div>
              <div className="w-4/12 px-5 text-center text-slate-800">
                <div>{player1Data.name} Points</div>
              </div>
              <div className="w-4/12 px-5 text-center text-slate-800">
                <div>{player2Data.name} Points</div>
              </div>
            </div>

            {compMatches.map((match, index) => (
              <div
                key={index}
                className="flex flex-wrap items-center justify-between py-2 border-b last:border-b-0"
                style={{ backgroundColor: index % 2 === 0 ? '#DFD7FE' : 'transparent' }} // Optional: Alternate row colors
              >
                <div className="w-4/12 px-5 text-center text-slate-800">
                  <div className='font-thin'>{formatDate(match.time)}</div> {/* Adjust the date format as needed */}
                </div>
                <div className="w-4/12 px-5 text-center text-slate-800">
                  <div className='font-thin'>{match.player1_marks}</div>
                </div>
                <div className="w-4/12 px-5 text-center text-slate-800">
                  <div className='font-thin'>{match.player2_marks}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 text-lg font-semibold text-center text-red-600">
          These players did not face each other.
        </div>
        )}
      </Typography>
    </div>
  </div>
)}
<div className="flex items-center justify-between px-0 py-5">
  <div className="hidden text-sm sm:block text-slate-500">
    Showing data 1 to 7 of 256k entries
  </div>
  <div className="flex space-x-1">
    <button className="px-3 py-1 text-sm font-normal transition duration-200 bg-white border rounded min-w-9 min-h-9 text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-black ease">
      Prev
    </button>
    <button className="px-3 py-1 text-sm font-normal transition duration-200 border rounded min-w-9 min-h-9 text-slate-500 bg-slate-800 border-slate-800 hover:text-white hover:bg-primarypurple hover:border-slate-600 ease">
      1
    </button>
    <button className="px-3 py-1 text-sm font-normal transition duration-200 bg-white border rounded min-w-9 min-h-9 text-slate-500 border-slate-200 hover:text-white hover:bg-primarypurple hover:border-slate-400 ease">
      2
    </button>
    <button className="px-3 py-1 text-sm font-normal transition duration-200 bg-white border rounded min-w-9 min-h-9 text-slate-500 border-slate-200 hover:text-white hover:bg-primarypurple hover:border-slate-400 ease">
      3
    </button>
    <button className="px-3 py-1 text-sm font-normal transition duration-200 bg-white border rounded min-w-9 min-h-9 text-slate-500 border-slate-200 hover:border-black ease">
      Next
    </button>
  </div>
</div>
    </div>
  );
}

export default Players;
