import { Card, CardBody } from "@material-tailwind/react";
import totalmatchicon from "../../../src/assets/icons/totalmatch.svg";
import totalpointsIcon from "../../../src/assets/icons/totalpoints.svg";
import winrateicon from "../../../src/assets/icons/winrate.svg";
import { useState, useEffect } from "react";
import { databases } from "../../../Appwrite/appwrite.config";
import { authUser } from "../../../Appwrite/actions/auth";
import { Query } from "appwrite";

export function MatchStatistic({matchScheduleTrigger}) {
  const [totalMatchCount, setTotalMatchCount] = useState(0);
  const [userId, setUserId] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);
  const [winRate,setWinRate]=useState(0);

  useEffect(() => {
    const userToken = authUser(); // Retrieve and decrypt the token using authUser
    console.log("outer token", userToken);
    if (userToken) {
      setUserId(userToken); // Set the decrypted token in state
      console.log("token", userToken);
      fetchMatchCount(userToken);
    }
  }, [matchScheduleTrigger]);

  const fetchMatchCount = async (id) => {
    try {
      const userResponse = await databases.getDocument(
        import.meta.env.VITE_DATABASEID,
        import.meta.env.VITE_COLLECTIONID_PLAYERS,
        id
      );
  
      if (userResponse && userResponse.name) {
        try {
          const player1Matches = await databases.listDocuments(
            import.meta.env.VITE_DATABASEID,
            import.meta.env.VITE_COLLECTIONID_MATCHES,
            [Query.equal("player1_name", [userResponse.name])]
          );
  
          const total1Marks = player1Matches.documents.reduce(
            (total, match) => total + (match.player1_marks || 0),
            0
          );
  
          const total1Wins = player1Matches.documents.filter(match => match.player1_marks > match.player2_marks).length;
  
          const player2Matches = await databases.listDocuments(
            import.meta.env.VITE_DATABASEID,
            import.meta.env.VITE_COLLECTIONID_MATCHES,
            [Query.equal("player2_name", [userResponse.name])]
          );
  
          const total2Marks = player2Matches.documents.reduce(
            (total, match) => total + (match.player2_marks || 0),
            0
          );
  
          const total2Wins = player2Matches.documents.filter(match => match.player1_marks < match.player2_marks).length;
  
          const totalMarks = total1Marks + total2Marks;
          const totalWins = total1Wins + total2Wins;
  
          // Combine results from both queries
          const combinedMatches = [
            ...player1Matches.documents,
            ...player2Matches.documents,
          ];
          const matchCount = combinedMatches.length;
  
          // Set total match count and total points
          setTotalMatchCount(matchCount);
          setTotalPoints(totalMarks);
  
          // Now calculate the win rate after setting match count
          if (matchCount > 0) {
            const wrate = (totalWins / matchCount).toFixed(2);
            setWinRate(wrate);
          }
  
        } catch (error) {
          console.error("Failed to fetch or update user document:", error);
        }
      } else {
        console.error("Invalid user response or missing name");
      }
    } catch (err) {
      console.error("Failed to fetch or update user document:", err);
    }
  };
  

  return (
    <Card className="w-[100vw] md:w-[75vw] h-[70vh] md:h-auto">
      <CardBody>
        {/*wrapper*/}
        <div className="flex flex-col items-center justify-between h-[60vh] md:h-auto md:flex-row">
          {/*total matches*/}
          <div className="flex flex-row gap-8 md:gap-3">
            {/*img icon*/}
            <div>
              <img src={totalmatchicon} className="w-20 h-20"></img>
            </div>
            {/*info icon*/}
            <div className="flex flex-col gap-1">
              <h3 className="text-textsecondary md:vf">Total Matches</h3>
              <h1 className="text-4xl font-black">{totalMatchCount}</h1>
              <p className="text-textprimary">
                <span className="text-[#00AC4F] font-bold text-sm">↑ 16% </span>
                this month
              </p>
            </div>
          </div>
          {/*total points*/}
          <div className="flex flex-row gap-8 md:gap-3">
            {/*img icon*/}
            <div>
              <img src={totalpointsIcon} className="w-20 h-20"></img>
            </div>
            {/*info icon*/}
            <div className="flex flex-col gap-1">
              <h3 className="text-textsecondary">Total Points</h3>
              <h1 className="text-4xl font-black">{totalPoints}</h1>
              <p className="text-textprimary">
                <span className="text-[#D0004B] font-bold text-sm">↓ 1% </span>
                this month
              </p>
            </div>
          </div>
          {/*win rate*/}
          <div className="flex flex-row gap-8 md:gap-3">
            {/*img icon*/}
            <div>
              <img src={winrateicon} className="w-20 h-20"></img>
            </div>
            {/*info icon*/}
            <div className="flex flex-col gap-1">
              <h3 className="text-textsecondary">Win Rate</h3>
              <h1 className="text-4xl font-black">{winRate}%</h1>
              <p className="text-textprimary">
                <span className="text-[#00AC4F] font-bold text-sm">↑ 16% </span>
                this month
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
