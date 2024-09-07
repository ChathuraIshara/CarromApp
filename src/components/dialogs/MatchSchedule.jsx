import React from "react";
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


export function MatchSchedule({open,setOpen,openSuccsufull,setOpenSuccesful}) {
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
            />
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