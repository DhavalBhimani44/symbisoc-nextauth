"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const userImage = session?.user?.image!
    const userEmail = session?.user?.email!
    function getInitialAndUppercase(userName: string) {
        if (userName && typeof userName === 'string' && userName.length > 0) {
            const initial = userName.charAt(0).toUpperCase();
            return initial;
        } else {
            return null;
        }
    }

    const onSignIn = () => {
        router.push('/sign-in');
    };

    const onSignUp = () => {
        router.push('/sign-up');
    };

    const handleClick = () => {
        router.push(`/${session?.user?.role.toLowerCase()}/profile`);
    };

    const onSignOut = async () => {
        await signOut();
        router.push('/');
    };

    return (
        <nav className="sticky h-14 inset-x-0 top-0 z-40 w-full bg-neutral-950 text-white backdrop-blur-lg transition-all">
            <div className="h-14 flex items-center mx-auto justify-between max-w-7xl">
                <Link href="/" className="flex z-40 font-semibold">
                    <span>symbiSoc.</span>
                </Link>

                <div className="flex items-center space-x-4">
                    {status === 'authenticated' ? (
                        <>
                            <Button variant={"destructive"} onClick={onSignOut}>Sign Out</Button>
                            <Avatar onClick={handleClick} className="cursor-pointer text-white">
                                <AvatarImage src={userImage}/>
                                <AvatarFallback>{getInitialAndUppercase(userEmail)}</AvatarFallback>
                            </Avatar>
                        </>
                    ) : (
                        <>
                            <Button variant={"default"} className="w-fit text-neutral-950 hover:bg-transparent transition duration-500 ease-out hover:text-white hover:border-white" onClick={onSignIn}>Sign in</Button>
                            <Button variant={"outline"} className="w-fit bg-neutral-950 text-white transition duration-500 ease-out hover:text-neutral-950 hover:bg-white" onClick={onSignUp}>Create an account</Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
