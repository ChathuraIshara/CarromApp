import React from "react";
import {
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import checkCircle from '../../../src/assets/icons/check-circle.svg';

export function ResultSubmitted({openSuccsufull,setOpenSuccesful,loggedUser}) {
    const handleOpen = () => setOpenSuccesful(!openSuccsufull);
  return (
    <Dialog size="sm" open={openSuccsufull} handler={handleOpen} className="p-4">
        <DialogHeader className="relative block m-0">
          <Typography variant="h4" color="blue-gray">
            Match Result
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="w-4 h-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="pb-6 space-y-0 md:space-y-4">

          <div className="flex items-center justify-center">
            <img src={checkCircle} className="w-[15] h-[15]"></img>
          </div>
          
          <div className="">
            <h1 className="text-lg font-bold text-center text-black md:text-4xl">Your <span className="text-primarypurple">Match Result</span> has been Succesfully Submitted!</h1>
           
          </div>
        </DialogBody>
        <DialogFooter>
        <h3 className="w-full text-center text-textsecondary">Opponent will get a notification about this match update.</h3>
        </DialogFooter>
      </Dialog>
  )
}

export default ResultSubmitted;