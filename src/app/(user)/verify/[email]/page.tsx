"use client";
import React from "react";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
  
  const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };

export default function verifyform() {
   const [verifycode, setverifycode] = useState(0)
  const router=useRouter();
  const params=useParams();
  const useremail=params.email;
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(useremail,verifycode);
    try {
        const response=await axios.post(`/api/verify-code`,{
            email:useremail,
            verifyCode:verifycode
        })

        if(response.data.success){
            console.log('User verified successfully');
            router.push(`/sign-in`)
        }
        else{
            console.log(response.data.message);
        }
    } catch (error) {
        console.log('Error while verifying user',error);
    }
    
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to music-store
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        {/* Login to aceternity if you can because we don&apos;t have a login flow
        yet */}
        please enter the verification code sent to your email
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="verify-code">verify-code</Label>
            <Input onChange={(e)=>setverifycode(parseInt(e.target.value))} id="username" placeholder="Enter code" type="number" />
          </LabelInputContainer>
        </div>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          submit &rarr;
          <BottomGradient />
          </button>
      </form>
    </div>
  );
}