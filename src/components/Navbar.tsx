"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();

    const onSignIn = () => {
        router.push('/sign-in');
    };

    const onSignUp = () => {
        router.push('/sign-up');
    };

    return (
        <nav className="sticky h-14 inset-x-0 top-0 z-40 w-full bg-neutral-950 text-white backdrop-blur-lg transition-all">
            <div className="h-14 flex items-center justify-between">
                <Link href="/" className="flex z-40 font-semibold">
                    <span>symbiSoc.</span>
                </Link>

                <div className="flex items-center space-x-4">
                    <>
                        <Button variant={"outline"} className="w-fit text-neutral-950 hover:bg-transparent transition duration-500 ease-out hover:text-white hover:border-white" onClick={onSignIn}>Sign in</Button>
                        <Button variant={"outline"} className="w-fit bg-neutral-950 text-white transition duration-500 ease-out hover:text-neutral-950 hover:bg-white" onClick={onSignUp}>Create an account</Button>
                    </>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
