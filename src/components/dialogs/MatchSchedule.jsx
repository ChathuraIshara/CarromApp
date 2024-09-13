import React from "react";
import { useState,useEffect } from "react";
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const players = [
  "John Doe",
  "Jane Smith",
  "James Johnson",
  "Emily Davis",
  "Michael Brown",
  // Add more player names here
];


export function MatchSchedule({open,setOpen,openSuccsufull,setOpenSuccesful}) {

  const [opponentName, setOpponentName] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (opponentName) {
      // Filter players based on input value (case-insensitive)
      const filteredSuggestions = players.filter((player) =>
        player.toLowerCase().includes(opponentName.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  }, [opponentName]);

  const handleChange = (e) => {
    setOpponentName(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setOpponentName(suggestion); // Set the input to the clicked suggestion
    setSuggestions([]); // Clear the suggestions
  };


  
    const handleOpen = () => {
      setOpen(!open);
      setOpenSuccesful(!openSuccsufull)

    };

    const handleClose=()=>
    {
      setOpen(false);
    }
  return (
    <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative block m-0">
          <Typography variant="h4" color="blue-gray">
            Match Result
          </Typography>
          <Typography className="mt-1 font-normal text-textsecondary">
            Please fill the following details to enter the match result
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleClose}
          >
            <XMarkIcon className="w-4 h-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="pb-6 space-y-4">

          <div>
            <Typography
              variant="small"
              className="mb-2 font-medium text-left text-textsecondary"
            >
              Opponent Name
            </Typography>
            <div className="relative">
      <Input
        color="gray"
        size="lg"
        placeholder="e.g., John Doe"
        name="name"
        className="placeholder:opacity-100 focus:!border-t-gray-900 focus:border-none bg-inputbg/40"
        containerProps={{
          className: "!min-w-full",
        }}
        labelProps={{
          className: "hidden",
        }}
        value={opponentName}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 overflow-y-auto bg-black border border-gray-300 rounded shadow-lg max-h-48">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 text-gray-400 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
          
          </div>
          
          <div className="flex gap-4">
            <div className="w-full">
              <Typography
                variant="small"
                className="mb-2 font-medium text-left text-textsecondary"
              >
                Your Marks
              </Typography>
              <Input
                type="number"
                color="gray"
                size="lg"
                placeholder="Select Marks"
                min="0"
                max="25"
                name="date"
                className="placeholder:opacity-100 focus:!border-t-gray-900 focus:border-none bg-inputbg/40"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                className="mb-2 font-medium text-left text-textsecondary"
              >
                Opponent Marks
              </Typography>
              <Input
                color="gray"
                size="lg"
                type='number'
                min="0"
                max="25"
                placeholder="Select Marks"
                name="CVV"
                className="placeholder:opacity-100 focus:!border-t-gray-900 focus:border-none bg-inputbg/40"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="w-full bg-primarypurple " onClick={handleOpen}>
            Schedule Appointment
          </Button>
        </DialogFooter>
      </Dialog>
  )
}

export default MatchSchedule;