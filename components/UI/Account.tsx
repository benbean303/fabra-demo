import { useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { saveDesign } from '@/utils/api';
import { motion } from 'framer-motion';

import { useAppStore, setDesignFromDB } from '@/stores/app-store';

export default function Account() {
  // Grab user details from auth0 hook
  const { user, isLoading } = useUser();

  // State to store the user's designs
  const [designs, setDesigns] = useState([]);

  // Fetch the user's designs when the user changes
  useEffect(() => {
    if (user) {
      refreshDesigns();
    }
  }, [user]);

  // Don't render anything if we're still loading or there's an error
  if (isLoading) return null;

  const refreshDesigns = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/designs?auth0Id=${user.sub}`);
      const data = await response.json();
      setDesigns(data.designs);
    } catch (error) {
      console.error(error);
    }
  };

  return user ? (
    <>
      <Designs designs={designs} />
      <Save refreshDesigns={refreshDesigns} />
    </>
  ) : (
    <Login />
  );
};

function Login() {
  return (
    <>
      <motion.div 
        className='flex flex-col bg-white absolute top-5 left-5 z-[1] rounded-lg'
      >
        <div className='font-visby text-black p-4'>
          <p className='text-[1.15rem] leading-[1rem] pt-1 pr-6'>Login to save your designs</p>
        </div>
        <div className='p-3 border-t-[1px] border-t-black/15 border-solid flex flex-col gap-2'>
          <a href='/api/auth/login' className='cursor-pointer h-full w-full'>
            <button className='rounded-full bg-[#7e5ef5] font-visby text-white py-2 cursor-pointer w-full'>
              Login
            </button>
          </a>
        </div>
      </motion.div>
    </>
  ) 
}

function Designs(props: any) {
  const { user } = useUser();

  // Update the app store with the selected design
  const onDesignClick = (design: any) => { 
    setDesignFromDB(design);
  };

  return (
    <motion.div 
      className='flex flex-col bg-white absolute top-5 left-5 z-[1] rounded-lg w-72'
      initial={{ x: '-120%' }}
      animate={{ x: 0 }}
    >
      <div className='font-visby text-black p-4'>
        <p className='text-[1.15rem] leading-[1rem] pt-1'>Hello, {String(user?.given_name)}</p>
      </div>
      <div className='p-3 border-t-[1px] border-t-black/15 border-solid flex flex-col gap-2'>
        <div className='p-3 rounded-lg border-black/15 border-solid border-[1px] flex flex-col gap-2'>
          <div className='flex items-center'>
            <p className='font-visby text-black pr-10 text-[0.85rem]'>My Designs</p>
          </div>
          <div className='grid gap-2 grid-cols-6'>
            {props.designs.length === 0 ? (
              <p className='text-black/50 text-[0.85rem]'>No designs found...</p>
            ) : (
              props.designs.map((design: any, index: number) => (
                <div onClick={() => onDesignClick(design)} key={index} className='w-8 h-8 rounded-full border-black/15 border-[1px] border-solid' style={{ backgroundColor: design.color }}></div>
              ))
            )}  
          </div>
        </div>
        <div className='p-3 rounded-lg border-black/15 border-solid border-[1px] flex flex-col gap-2'>
          <div className='flex items-center'>
            <p className='font-visby text-black pr-10 text-[0.85rem]'>Logout</p>
          </div>
          <div className='flex gap-2'>
            <a href='/api/auth/logout' className='cursor-pointer h-full w-full'>
              <button className='rounded-full bg-[#7e5ef5] font-visby text-white py-2 cursor-pointer w-full'>
                Logout
              </button>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Save(props: any) {
  const { user } = useUser();
  const { hoodie } = useAppStore((state) => state);

  const [isSaving, setIsSaving] = useState(false);

  // Call the /api/save route when clicked
  const onSaveClick = async () => {
    setIsSaving(true);

    try {
      await saveDesign({ hoodie, auth0Id: user?.sub });
      setIsSaving(false);

      // Once saved, refresh the available designs
      props.refreshDesigns();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div 
      className='flex flex-col bg-white absolute bottom-5 left-5 z-[1] rounded-lg w-64'
      initial={{ x: '-120%' }}
      animate={{ x: 0 }}
      transition={{ delay: 0.25 }}
    >
      <div className='font-visby text-black p-4'>
        <p className='text-[1.15rem] leading-[1rem] pt-1'>Save your design</p>
      </div>
      <div className='p-3 border-t-[1px] border-t-black/15 border-solid flex flex-col gap-2'>
        <div className='flex gap-2'>
          <button onClick={onSaveClick} className={`rounded-full h-12 bg-[#7e5ef5] font-visby text-white py-2 cursor-pointer w-full flex items-center justify-center ${twMerge(isSaving && 'opacity-50 pointer-events-none')}`}>
            {isSaving ? 
              <img className='h-8 w-8 p-1' src='/images/icons/spinner.svg'/> 
            : 
              'Save'
            }
          </button>
        </div>
      </div>
    </motion.div>
  )
}