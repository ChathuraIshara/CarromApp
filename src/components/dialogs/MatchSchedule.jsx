import React, { useState, useEffect } from "react";
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
import {DATABASE_ID} from '../../../Appwrite/appwrite.config';
import {MATCH_COLLECTION_ID} from '../../../Appwrite/appwrite.config';
import { databases } from "../../../Appwrite/appwrite.config";

const players = [
  "John Doe",
  "Jane Smith",
  "James Johnson",
  "jofdfs",
  "jfsdafdsf",
  "Emily Davis",
  "Michael Brown",
  // Add more player names here
];

export function MatchSchedule({
  open,
  setOpen,
  openSuccsufull,
  setOpenSuccesful,
}) {
  const [opponentName, setOpponentName] = useState("");
  const [yourMarks, setYourMarks] = useState("");
  const [opponentMarks, setOpponentMarks] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [errors, setErrors] = useState({
    opponentName: "",
    yourMarks: "",
    opponentMarks: "",
  });

  useEffect(() => {
    if (opponentName) {
      const filteredSuggestions = players.filter((player) =>
        player.toLowerCase().includes(opponentName.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [opponentName]);

  const handleChange = (e) => {
    setOpponentName(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setOpponentName(suggestion);
    setSuggestions([]);
  };

  const validateFields = () => {
    const newErrors = {
      opponentName: opponentName ? "" : "Opponent Name is required !",
      yourMarks: yourMarks ? "" : "Your Marks are required !",
      opponentMarks: opponentMarks ? "" : "Opponent Marks are required !",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleScheduleSubmit = async (matchData) => {
    if (validateFields()) {
      try {
        const response = await databases.createDocument(
          DATABASE_ID,       // Database ID
          MATCH_COLLECTION_ID, // Collection ID
          'unique()',
          {
            player1_name:'evano',
            player2_name:opponentName,
            player1_marks: parseInt(yourMarks, 10), // Ensure this is an integer
           player2_marks: parseInt(opponentMarks, 10), // Ensure this is an integer
            time:new Date().toISOString()
          }
         
        );
        console.log("Document Created: ", response);
        setOpen(!open);
        setOpenSuccesful(!openSuccsufull);
      } catch (error) {
        console.log("id",DATABASE_ID)
        console.error("Error creating document: ", error);
      }
     
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog size="sm" open={open} className="p-4">
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
              color="blue-gray"
              size="lg"
              placeholder="e.g., John Doe"
              name="name"
              className="placeholder:opacity-100"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "static",
              }}
              value={opponentName}
              onChange={handleChange}
              onBlur={() => {
                setTimeout(() => setSuggestions([]), 100);
              }}
            />
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 z-10 mt-2 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg max-h-48">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            {errors.opponentName && (
              <Typography
                variant="small"
                className="text-xs text-red-400 sm:text-sm"
              >
                {errors.opponentName}
              </Typography>
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
              color="blue-gray"
              size="lg"
              placeholder="Select Marks"
              min="0"
              max="25"
              name="date"
              value={yourMarks}
              onChange={(e) => setYourMarks(e.target.value)}
              className="placeholder:opacity-100"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "static",
              }}
            />
            {errors.yourMarks && (
              <Typography
    
                variant="small"
                className="text-xs text-red-400 sm:text-sm"
              >
                {errors.yourMarks}
              </Typography>
            )}
          </div>

          <div className="w-full">
            <Typography
              variant="small"
              className="mb-2 font-medium text-left text-textsecondary"
            >
              Opponent Marks
            </Typography>
            <Input
              color="blue-gray"
              size="lg"
              type="number"
              min="0"
              max="25"
              placeholder="Select Marks"
              name="CVV"
              value={opponentMarks}
              onChange={(e) => setOpponentMarks(e.target.value)}
              className="border-gray-500 placeholder:opacity-100"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "static",
              }}
            />
            {errors.opponentMarks && (
              <Typography
               
                variant="small"
                className="text-xs text-red-400 sm:text-sm"
              >
                {errors.opponentMarks}
              </Typography>
            )}
          </div>
        </div>
      </DialogBody>

      <DialogFooter>
        <Button
          type="submit"
          className="w-full bg-primarypurple"
          onClick={handleScheduleSubmit}
        >
          Schedule Match
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default MatchSchedule;
