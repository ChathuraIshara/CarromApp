'use client'
import React from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { FormfieldTypes } from './Signupform'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface CustomProps {
    control:Control<any>
    FeildType:FormfieldTypes
    name:string
    labal:string
    placeholder:string
    options?: { value: string; label: string }[];
    iconSrc?:string
    iconAlt?:string
    disabled?:boolean
    dateFormat?:string
    showTimeSelect?:boolean
    children?:React.ReactNode
    renderSkeleton?:(field:any)=>React.ReactNode
}
 const RenderFeild =({field,props}:{field:any; props:CustomProps})=>{
    const {FeildType,iconSrc,iconAlt,placeholder,options}=props
    switch(FeildType){
        case FormfieldTypes.INPUT:
            return(
                <div className='flex border rounded-md border-dark-500 bg-dark-400'>
                  {iconSrc && (
                    <img
                        src={iconSrc} // Use either the passed-in src or the imported default icon
                        alt={iconAlt || 'icon'}
                        width={50}
                        height={50}
                     /> 
                  )} 
                  <FormControl>
                    <Input placeholder={placeholder}
                    {...field}
                    className= 'mx-0 border-0 bg-dark-400 placeholder:text-dark-600 border-dark-500 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 !important;'/>
                  </FormControl>
                </div>
            )
            case FormfieldTypes.SELECT:
              return (
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {options && options.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              );
      
    }

 }

function CoustomFormFeild(props:CustomProps) {
const {control,FeildType,name,labal,placeholder}=props
    return (
      <FormField
          control={control}
          name={name}
          render={({ field }) => (
           <FormItem className='flex-1'>
            {FeildType !==FormfieldTypes.CHECKBOX && labal  &&(
                <FormLabel>{labal}</FormLabel>
            )}
            <RenderFeild field={field} props={props}/>
            <FormMessage className='text-red-400 !important'/>
           </FormItem>
          )}
        />
  )
}

export default CoustomFormFeild