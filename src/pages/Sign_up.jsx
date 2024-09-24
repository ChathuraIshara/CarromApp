import {
    Card,
    Input,
    Checkbox,
  
    Typography,
  } from "@material-tailwind/react";
  import { Link } from "react-router-dom";
import Signupform from "../components/Signupform";
  
import { Button } from "../components/ui/button"
  export function SignUp() {
    async function handleSubmit({id,name,index,}) {
      try {
        const userData ={id,name,index};
        
      }
      catch (error){
        console.log(error);
      }}
    return (
      <section className="m-8 flex">
              <div className="w-2/5 h-full hidden lg:block">
          <img
           src="/bruce-mars.jpeg"
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to register.</Typography>
          </div>
          <div className=" mt-6 flex items-center justify-center w-1/2">
           <Signupform/>
          
          </div>
           <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
              Alredy registered?
              <Link to="/sign-in" className="text-gray-900 ml-1 hover:text-primarypurple">Login User</Link>
            </Typography>
        </div>
      </section>
    );
  }
  
  export default SignUp;
  