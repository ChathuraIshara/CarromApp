import React, { useEffect } from 'react';
import { MatchStatistic } from './cards/MatchStatistic';
import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import MatchSchedule from './dialogs/MatchSchedule';
import ResultSubmitted from './dialogs/ResultSubmitted';
import { databases } from '../../Appwrite/appwrite.config';
import {authUser} from '../../Appwrite/actions/auth';


function Dashboard() {
  const [open, setOpen] = useState(false);  // var for opening match schedule popup
  const [openSuccsufull, setOpenSuccesful] = useState(false);  // var for opening match schedule successful popup
  const [token, setToken] = useState('');
  const [loggedUser,setLoggedUser]=useState({});

  const [matchScheduleTrigger,setMatchScheduleTrigger]=useState(0);

  const handleOpen = () => setOpen(!open);

  //appwrite testing for fetching match details

  const [matches,setMatches]=useState([]);

 
  useEffect(()=>
  {
    const userToken = authUser();  // Retrieve and decrypt the token using authUser
    console.log('outer token',userToken);
    if (userToken) {
      setToken(userToken);  // Set the decrypted token in state
      console.log('token',userToken);
      fetchUser(userToken);
    }
    
    init();
    
  },[])

  const init = async () =>
  {
    const response= await databases.listDocuments
    (
      import.meta.env.VITE_DATABASEID,
      import.meta.env.VITE_COLLECTIONID_MATCHES
     );
     //console.log("reso",response.documents);
     
     setMatches(response.documents);
  }

  const fetchUser = async (id) => {
    try {
      const response = await databases.getDocument(
        import.meta.env.VITE_DATABASEID,           // Database ID
        import.meta.env.VITE_COLLECTIONID_PLAYERS, // Collection ID
        id                                       // Document ID
      );
     // console.log('Document data:', response);
      //setDocument(response);  // Store the document data in state
      console.log('user',response);
      setLoggedUser(response);
      //setLoggedUserName(response.name);
    } catch (err) {
      console.error('Failed to fetch document:', err);
     
    }
  };

  return (
    <div className="">
      <div className="relative h-[85vh]">
        <MatchStatistic matchScheduleTrigger={matchScheduleTrigger} userId={token} />
        {/* Button container positioned at the bottom */}
        <div className="absolute bottom-0 right-0 flex justify-end w-full p-4">
          <Button onClick={handleOpen} className="bg-primarypurple">+ Add Match</Button> 
          <MatchSchedule setMatchScheduleTrigger={setMatchScheduleTrigger} loggedUser={loggedUser} openSuccsufull={openSuccsufull} setOpenSuccesful={setOpenSuccesful} open={open} setOpen={setOpen}></MatchSchedule> 
          <ResultSubmitted loggedUser={loggedUser} openSuccsufull={openSuccsufull} setOpenSuccesful={setOpenSuccesful}></ResultSubmitted>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
