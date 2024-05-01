import { BackgroundBeams } from '@/components/ui/background-beams';
import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <div className='px-10 relative antialiased'>
        <div className='relative z-10 h-fit'>
        {children}
        </div>
        <BackgroundBeams className='fixed'/>
      </div>
    </>
  )
};

export default AuthLayout;