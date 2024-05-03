"use client";
import SignInForm from '@/components/form/SignInForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const {data:session, status} = useSession();
  const router = useRouter()
  if(status === 'authenticated'){
    router.push(`/${session?.user?.role.toLowerCase()}/profile`)
  }
  return (
    <div className="w-full h-full m-auto py-32 sm:py-28 md:py-24 lg:py-24 xl:py-24">
        <SignInForm/>
    </div>
  );
};

export default Page;