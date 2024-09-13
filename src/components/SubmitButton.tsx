import React from 'react'
import { Button } from './ui/button';
import { Typography } from '@material-tailwind/react';
interface ButtonProps{
    isloading:boolean;
    className?:string;
    children:React.ReactNode
}
function SubmitButton({isloading,className,children}:ButtonProps) {
  return (
   <Button type='submit'  disabled={isloading} className={className ?? 'w-full bg-purple-900 hover:bg-deep-purple-400 text-white h-11 rounded-md'}>
    {isloading? (
        <div className='flex items center gap-4 '>
            <p>Loading...</p>
        </div>
    ):children}
   </Button>
  )
}

export default SubmitButton