"use client";
import SignUpForm from '@/components/form/SignUpForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter()
  if (status === 'authenticated') {
    router.push(`/${session?.user?.role.toLowerCase()}/profile`)
  }
  return (
    <div className='w-full h-full m-auto py-28 sm:py-4 md:py-12 lg:py-6 xl:py-8'>
      <SignUpForm />
    </div>
  );
};

export default Page;