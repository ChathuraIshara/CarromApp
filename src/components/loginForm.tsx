import React from 'react'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import  { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Form } from "@/components/ui/form"
  import CoustomFormFeild from "./coustomFormFeild"
import SubmitButton from "./SubmitButton"
import { useNavigate } from "react-router-dom"
import { AlertCircle } from "lucide-react"
import { SignUpFormValidation } from '@/lib/Validaton'
import { FormfieldTypes } from './Signupform'
const LoginForm=()=> {
    const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false)
 const [errorMessage, setErrorMessage] = useState<string | null>(null)

     const form = useForm<z.infer<typeof SignUpFormValidation>>({
    resolver: zodResolver(SignUpFormValidation),
    defaultValues: {
      name: "",
      email: "",
      index: "",
      password: "",
      confirmPassword: "",
    },
  })
   async function onSubmit({name,email,index,password}: z.infer<typeof SignUpFormValidation>) {
    setIsloading(true);
    const userData = {
        name,
        email,
        index,
        password
      }
    try {
      
      const playerdata ={
        name,
        index,
        faculty:"",
        wtsno:"",
        district:"",
        date_joined:""
      }
//after submitting clear fleild
    } catch (error) {
      if (error?.code === 409) {
              // If the email already exists, set a custom error message
              setErrorMessage(`${userData.email}, already exists.`);

            } else {
              setErrorMessage("An error occurred while creating the user. Please try again.");
            }
    }
    finally{
      setIsloading(false);
    }
  }
  return (
        <>
         <div className="flex justify-center items-center w-full">
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
            {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
              <AlertDescription>Please try Again.</AlertDescription>
            </Alert>
            )}
      
          <CoustomFormFeild 
                FeildType={FormfieldTypes.INPUT}
                control={form.control} 
                name="email"
                labal="Email Address"
                placeholder="Enter your Email here"
         
          />
          
             <CoustomFormFeild 
                FeildType={FormfieldTypes.INPUT}
                control={form.control} 
                name="password"
                labal="Password"
                placeholder="Enter your Password here"
         
          />
         
             <SubmitButton isloading={isloading}> Sign In</SubmitButton>
  
       
      </form>
    </Form>
    </div>
        </>
  )
}
export default LoginForm
