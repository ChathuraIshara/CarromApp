import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";

  import { Link, useNavigate } from "react-router-dom";
  import LoginForm from "../components/loginForm";

import { useEffect } from "react";
  import { Navigate } from "react-router-dom";
  export  function SignIn() {
 const navigate = useNavigate();
  
    return (
      <section className="m-8 flex gap-4">
        <div className="w-full lg:w-3/5 mt-24">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
          </div>
          <div className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
            <LoginForm/>
            <div className="flex items-center justify-between gap-2 mt-6">
              <Typography variant="small" className="font-medium text-gray-900">
                <a href="#">
                  Forgot Password
                </a>
              </Typography>
            </div>
            <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
              Not registered?
              <Link to="/sign-up" className="text-gray-900 ml-1 hover:text-primarypurple">Create account</Link>
            </Typography>
          </div>
  
        </div>
        <div className="w-3/5 h-full hidden lg:block flex flex-row ">
          <img
            src="/bruce-mars.jpeg"
            className="h-[100vh] w-full object-cover rounded-3xl"
          />
        </div>
  
      </section>
    );
  }
  
  export default SignIn;
  