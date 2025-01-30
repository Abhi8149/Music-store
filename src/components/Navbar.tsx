"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const session=useSession(); 
    const user=session.data?.user as User;   

  return (
    <div
    className={cn("top-10 inset-x-0 max-w-2xl mx-auto z-50 space-x-3", className)}
    // className="flex justify-center"
    >
        <Menu setActive={setActive}>
          <Link href={"/"}>
             {(session.data?.user)?(
            <MenuItem  setActive={setActive} active={active} item={user.email ?? "User"}></MenuItem>
              
             ):(
              <MenuItem setActive={setActive} active={active} item="Music-store"></MenuItem>
             )
             }
          </Link>
            <Link href={"/"}>
            <MenuItem setActive={setActive} active={active} item="Home">
            
            </MenuItem>
            </Link>
            {/* <Link href={"/sign-in"}> */}
            {(session.data?.user)?(
            <Link href={'/'} onClick={() => signOut()}>
            <MenuItem setActive={setActive} active={active} item="Logout"></MenuItem>
            </Link>
             ):(
              <Link href={"/sign-in"}>
              <MenuItem setActive={setActive} active={active} item="Sign-in"></MenuItem>
              </Link>
             )
             }  
            {/* </Link> */}
            <MenuItem
            setActive={setActive} active={active} item="Our Courses"
            >
               <div className="flex flex-col space-y-4 text-sm">
               <HoveredLink href="/courses">All Courses</HoveredLink>
            <HoveredLink href="/courses">
              Basic Music Theory
            </HoveredLink>
            <HoveredLink href="/courses">
              Advanced Composition
            </HoveredLink>
            <HoveredLink href="/courses">Songwriting</HoveredLink>
            <HoveredLink href="/courses">
              Music Production
            </HoveredLink>
               </div>
            </MenuItem>
            <Link href={"/contact"}>
            <MenuItem setActive={setActive} active={active} item="Contact Us">
            
            </MenuItem>
            </Link>
        </Menu>
    </div>
  )
}

export default Navbar