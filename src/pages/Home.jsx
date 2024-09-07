import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import Matches from '../components/Matches';
import Players from '../components/Players';
import Help from '../components/Help';
import Profile from '../components/Profile';


function Home() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedItem,setSelectedItem]=useState(0);

    const toggleSidebar = () => {
      console.log("toggled",isSidebarOpen);
      setIsSidebarOpen(!isSidebarOpen);
    };    
    const renderContent = () => {
      switch (selectedItem) {
        case 0:
          return <Dashboard />;
        case 1:
          return <Matches />;
        case 2:
          return <Players />;
        case 3:
            return <Help />;
        case 4:
          return <Profile/>    
        default:
          return <Dashboard />; // Default to Dashboard if no match
      }
    };  


  return (
    <div className="flex h-screen ">
      {/* Sidebar, controlled by isSidebarOpen state */}
      <Sidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main content */}
      <div className="flex-1 min-h-screen bg-gray-100 bg-bodybg">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="px-4 py-4 md:px-14">
       {/* Conditional rendering of the content */}
       {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default Home;