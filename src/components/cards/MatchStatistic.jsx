import {
    Card,
    CardBody,
  } from "@material-tailwind/react";
  import totalmatchicon from '../../../src/assets/icons/totalmatch.svg';
  import totalpointsIcon from '../../../src/assets/icons/totalpoints.svg';
  import winrateicon from '../../../src/assets/icons/winrate.svg';
   
  export function MatchStatistic() {
    return (
      <Card className="w-[90vw] md:w-[75vw] h-[70vh] md:h-auto">
        <CardBody>
            {/*wrapper*/}
            <div className="flex flex-col items-center justify-between h-[60vh] md:h-auto md:flex-row">
                {/*total matches*/}
                <div className="flex flex-row gap-8 md:gap-3">
                    {/*img icon*/}
                    <div>
                        <img src={totalmatchicon}></img>
                    </div>
                    {/*info icon*/}
                    <div className="flex flex-col gap-1">
                        <h3 className="text-textsecondary md:vf">Total Matches</h3>
                        <h1 className="text-4xl font-black">5,423</h1>
                        <p className="text-textprimary"><span className="text-[#00AC4F] font-bold text-sm">↑ 16% </span>this month</p>
                    </div>

                </div>
                 {/*total points*/}
                 <div className="flex flex-row gap-8 md:gap-3">
                    {/*img icon*/}
                    <div>
                        <img src={totalpointsIcon}></img>
                    </div>
                    {/*info icon*/}
                    <div className="flex flex-col gap-1">
                        <h3 className="text-textsecondary">Total Points</h3>
                        <h1 className="text-4xl font-black">1,893</h1>
                        <p className="text-textprimary"><span className="text-[#D0004B] font-bold text-sm">↓ 1% </span>this month</p>
                    </div>

                </div>
                  {/*win rate*/}
                  <div className="flex flex-row gap-8 md:gap-3">
                    {/*img icon*/}
                    <div>
                        <img src={winrateicon}></img>
                    </div>
                    {/*info icon*/}
                    <div className="flex flex-col gap-1">
                        <h3 className="text-textsecondary">Win Rate</h3>
                        <h1 className="text-4xl font-black">78%</h1>
                    </div>

                </div>
               

            </div>
          
        </CardBody>
      
      </Card>
    );
  }