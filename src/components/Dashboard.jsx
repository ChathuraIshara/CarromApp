import React, { useEffect } from 'react';
import { MatchStatistic } from './cards/MatchStatistic';
import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import MatchSchedule from './dialogs/MatchSchedule';
import ResultSubmitted from './dialogs/ResultSubmitted';
import { databases } from '../appwrite/config';

function Dashboard() {
  const [open, setOpen] = useState(false);  // var for opening match schedule popup
  const [openSuccsufull, setOpenSuccesful] = useState(false);  // var for opening match schedule successful popup

  const handleOpen = () => setOpen(!open);

  //appwrite testing for fetching match details

  const [matches,setMatches]=useState([]);

  useEffect(()=>
  {
    init();
    
  },[])

  const init = async () =>
  {
    const response= await databases.listDocuments
    (
      import.meta.env.VITE_DATABASEID,
      import.meta.env.VITE_COLLECTIONID_MATCHES
     );
     console.log("reso",response.documents);
     
     setMatches(response.documents);
  }

  return (
    <div className="">
      <div className="relative h-[85vh]">
        <MatchStatistic />
        {/* Button container positioned at the bottom */}
        <div className="absolute bottom-0 right-0 flex justify-end w-full p-4">
          <Button onClick={handleOpen} className="bg-primarypurple">+ Add Match</Button> 
          <MatchSchedule openSuccsufull={openSuccsufull} setOpenSuccesful={setOpenSuccesful} open={open} setOpen={setOpen}></MatchSchedule> 
          <ResultSubmitted openSuccsufull={openSuccsufull} setOpenSuccesful={setOpenSuccesful}></ResultSubmitted>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
