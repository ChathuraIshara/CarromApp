import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/Sign_in";
import SignUp from "../pages/Sign_up";

const RoutesComponent = () => {
    return (
        <Router>
           
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
      
        </Router>
    );
};

export default RoutesComponent;
