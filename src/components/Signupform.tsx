"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Form } from "@/components/ui/form"
import CoustomFormFeild from "./coustomFormFeild"
import SubmitButton from "./SubmitButton"
import { SignUpFormValidation } from "@/lib/Validaton"
import { createplayer, createUser } from "../../Appwrite/actions/players.actions";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from 'lucide-react';


 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
export enum FormfieldTypes{
  INPUT='input',
  CHECKBOX='checkbox',
  TEXTAREA='textarea',
  PHONE_NO='phoneInput',
  DATE_PICKER='datePicker',
  SELECT='select',
  SKELETON='skeleton'
}


const  Signupform =()=> {
  // 1. Define your form.
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
     const user = await createUser(userData)
      if(user){ 
          await createplayer(playerdata,user.$id);
         navigate('/sign-in')
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
  
    <div className="flex items-center justify-center w-full">
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
              <AlertDescription>Please try Again.</AlertDescription>
            </Alert>
            )}
           <CoustomFormFeild 
              FeildType={FormfieldTypes.INPUT}
              control={form.control} 
              name="name"
              labal="Full Name"
              placeholder="Enter your Full Name here"
         
          />
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
                name="index"
                labal="Index"
                placeholder="Enter your Index here"
         
          />
             <CoustomFormFeild 
                FeildType={FormfieldTypes.INPUT}
                control={form.control} 
                name="password"
                labal="Password"
                placeholder="Enter your Password here"
         
          />
             <CoustomFormFeild 
                FeildType={FormfieldTypes.INPUT}
                control={form.control} 
                name="confirmPassword"
                labal="Confirm Password"
                placeholder="Enter your Password again"
         
          />
         
             <SubmitButton isloading={isloading}> Get Started</SubmitButton>
  
       
      </form>
    </Form>
    </div>
  )
}

export default Signupform