"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileCard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false)
  const { data: session } = useSession();
  const userImage = session?.user?.image!;
  const userEmail = session?.user?.email!;

  function getInitialAndUppercase(userName: string) {
    if (userName && typeof userName === "string" && userName.length > 0) {
      const initial = userName.charAt(0).toUpperCase();
      return initial;
    } else {
      return null;
    }
  }

  function extractNamesFromEmail(email: string): { firstName: string, lastName: string | null } | null {
    const parts = email.split('@');

    if (parts.length !== 2) {
      return null;
    }

    const namePart = parts[0];
    const nameParts = namePart.split('.');

    let firstName = "";
    let lastName: string | null = null;

    if (nameParts.length === 1) {
      firstName = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1);
    } else if (nameParts.length === 2) {
      firstName = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1);
      lastName = nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1);
    } else {
      firstName = nameParts.slice(0, -1).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
      lastName = nameParts[nameParts.length - 1].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].slice(1);
    }

    return { firstName, lastName };
  }
  const names = userEmail ? extractNamesFromEmail(userEmail) : null;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 50);
  }, []);

  async function handleLogout() {
    setIsLoadingButton(true)
    await signOut();
  }

  return (
    <div className="flex justify-center items-center">
      {isLoading ? (
        <Skeleton className="w-[350px] h-[250px] bg-slate-700" />
      ): (      
      <Card className="w-[350px] bg-slate-700">
        <CardHeader className="flex">
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold text-slate-900">Profile</CardTitle>
            <Avatar>
              <AvatarImage src={userImage} />
              <AvatarFallback>{getInitialAndUppercase(userEmail)}</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription >
            <span className="text-white text-base">PRN: </span>
            <span className="text-emerald-400 text-base">{session?.user?.PRN}</span><br />          
            <span className="text-white text-base">Name: </span>
            <span className="text-emerald-400 text-base">{names?.firstName} {names?.lastName}</span><br />          
            <span className="text-white text-base">Email: </span>
            <span className="text-emerald-400 text-base">{userEmail}</span><br />          
          </CardDescription>
          <Button variant={'destructive'} className="mt-7 flex gap-1.5" isLoading={isLoadingButton} onClick={handleLogout}>Logout <LogOut size={18} /></Button>
        </CardContent>
      </Card>
      )}
    </div>
  );
};

export default ProfileCard;
