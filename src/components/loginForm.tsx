import React, { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CoustomFormFeild from "./coustomFormFeild"
import SubmitButton from "./SubmitButton"
import { useNavigate } from "react-router-dom"
import { AlertCircle } from "lucide-react"
import { FormfieldTypes } from './Signupform'
import { loginUser } from '../../Appwrite/actions/loginUser.action'
import { LoginFormValidation } from '@/lib/loginvalidations'

const LoginForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const form = useForm<z.infer<typeof LoginFormValidation>>({
        resolver: zodResolver(LoginFormValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    
    async function onSubmit({ email, password }: z.infer<typeof LoginFormValidation>) {
        setIsLoading(true);

        try {
            const session = await loginUser(email, password); // Call the login functio
            if (session) {
                navigate("/");
            }
        } catch (error: any) {
            if (error?.code === 409) {
                setErrorMessage(`Email or Password Incorrect...`);
            } else {
                setErrorMessage("An error occurred while logging in. Please try again.");
            }
        } finally {
            setIsLoading(false);
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
                                <AlertDescription>Please try again.</AlertDescription>
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

                        <SubmitButton isloading={isLoading}>Sign In</SubmitButton>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default LoginForm;

