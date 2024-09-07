import React from 'react';
import { MatchStatistic } from './cards/MatchStatistic';
import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import MatchSchedule from './dialogs/MatchSchedule';
import ResultSubmitted from './dialogs/ResultSubmitted';

function Dashboard() {
  const [open, setOpen] = useState(false);  // var for opening match schedule popup
  const [openSuccsufull, setOpenSuccesful] = useState(false);  // var for opening match schedule successful popup

  const handleOpen = () => setOpen(!open);

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
