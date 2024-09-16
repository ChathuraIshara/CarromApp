import React from 'react';
import { Input, Select, Option } from "@material-tailwind/react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";

function Players() {
  const [openMenu, setOpenMenu] = React.useState(false);
  return (
    <>
      <div className="bg-white p-4 rounded-lg head">
        <div className="w-full flex justify-between items-center mb-3 mt-1">
          <div className="lg:w-3/12 px-0">
            <div className="flex items-center justify-start space-x- md:gap-2">
              <Menu
                open={openMenu} handler={setOpenMenu} allowHover
                placement="bottom-start"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                <MenuHandler>
                  <Button
                    variant="text"
                    className="flex items-center gap-3 text-base font-normal capitalize tracking-normal"
                  >
                    All{" "}
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`h-3.5 w-3.5 transition-transform ${openMenu ? "rotate-180" : ""
                        }`}
                    />
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem>Menu Item 1</MenuItem>
                  <MenuItem>Menu Item 2</MenuItem>
                  <MenuItem>Menu Item 3</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
          <div className="lg:w-9/12 px-0 ">
            <div className="w-full flex flex-row gap-8">
              <div className="w-full lg:w-1/2 relative">
                <Input label="Search " />
              </div>
              <div className="w-full lg:w-1/2 relative">
                <Input label="Search " />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between items-center mb-3 mt-1 photo">
          <div className="hidden lg:block lg:w-3/12 px-0">
          </div>
          <div className="w-full lg:w-9/12 px-0 pt-3">
            <div className="w-full flex flex-row gap-8">
              <div className="w-1/2 flex items-center justify-center relative">
                <Card className="w-40">
                  <CardBody className="text-center flex flex-col items-center p-2">
                    <img
                      src="https://docs.material-tailwind.com/img/team-3.jpg"
                      alt="profile-picture"
                      className="object-cover h-24 w-24 rounded-full mb-2"
                    />
                    <Typography variant="h6" color="blue-gray" className="text-sm">
                      Natalie Paisley
                    </Typography>
                  </CardBody>
                </Card>
              </div>
              <div className="w-1/2 flex items-center justify-center relative">
                <Card className="w-40">
                  <CardBody className="text-center flex flex-col items-center p-2">
                    <img
                      src="https://docs.material-tailwind.com/img/team-3.jpg"
                      alt="profile-picture"
                      className="object-cover h-24 w-24 rounded-full mb-2"
                    />
                    <Typography variant="h6" color="blue-gray" className="text-sm">
                      Natalie Paisley
                    </Typography>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>


        <div className="w-full flex justify-between items-center mb-3 mt-1 body">
          <div className="w-full px-0">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col bg-white p-4 px-0 border rounded-lg shadow hover:bg-slate-50 transition duration-200">
                {[
                  { id: 'PROJ1001', name: 'John Doe', amount: '$1,200.00' },
                  { id: 'PROJ1002', name: 'Jane Smith', amount: '$8500.00' },
                  { id: 'PROJ1003', name: 'Acme Corp', amount: '$2,500.00' },
                  { id: 'PROJ1004', name: 'Global Inc', amount: '$4,750.00' },
                  { id: 'PROJ1005', name: 'Global Inc', amount: '$4,750.00' },
                  { id: 'PROJ1006', name: 'Global Inc', amount: '$4,750.00' },
                  { id: 'PROJ1007', name: 'Global Inc', amount: '$4,750.00' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b last:border-b-0"
                    style={{ backgroundColor: index % 2 === 0 ? '#DFD7FE' : '#F5F4FE' }}
                  >
                    <div className="w-4/12 lg:w-3/12 text-sm text-slate-800 px-5">
                      {item.id}
                    </div>
                    <div className="flex w-8/12 lg:w-9/12 justify-between">
                      <div className="w-4/12 lg:w-1/2 flex items-center justify-center relative">
                        {item.name}
                      </div>
                      <div className="w-4/12 lg:w-1/2 flex items-center justify-center relative">
                        {item.amount}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center px-4 py-5">
              <div className="text-sm hidden sm:block text-slate-500">
                Showing data 1 to 7 of 256k entries
              </div>
              <div className="flex space-x-1">
                <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-black transition duration-200 ease">
                  Prev
                </button>
                {[1, 2, 3].map(page => (
                  <button
                    key={page}
                    className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal ${page === 1 ? 'bg-slate-800 text-white' : 'text-slate-500 bg-white border border-slate-200'
                      } rounded hover:bg-primarypurple hover:border-slate-400 transition duration-200 ease`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:border-black transition duration-200 ease">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}

export default Players;
