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
import { createUser } from "../../Appwrite/actions/players.actions";
import { useNavigate } from "react-router-dom"
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

  const form = useForm<z.infer<typeof SignUpFormValidation>>({
    resolver: zodResolver(SignUpFormValidation),
    defaultValues: {
      name: "",
      index: "",
      password: "",
      confirmPassword: "",
    },
  })
 

 async function onSubmit({name,index,password}: z.infer<typeof SignUpFormValidation>) {
    setIsloading(true);
    console.log("name",name)
    try {
      const userData = {
        name,
        index,
        password
      }
     const user = await createUser(userData)
      // if (user) {
      //   navigate('/');
      //   //'/dashboard/${createdUser.$id}'
      // }
    } catch (error) {
      console.log(error)
      
    }
    finally{
      setIsloading(false);
    }
  }
  return (
    <div className="flex justify-center items-center w-full">
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        
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