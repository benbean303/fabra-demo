import { useState } from "react";
import { MATERIALS } from "@/static/constants";

import { motion } from "framer-motion";

import { useAppStore, setMaterial } from "@/stores/app-store";

export default function MaterialSelector() {
  const { selectedMeshes } = useAppStore((state) => state);
  const [selected, setSelected] = useState(null);

  // Update the app store when a new material is selected
  const onNewSelection = (index: number) => {
    setSelected(null);
    
    const newMaterial: string = Object.keys(MATERIALS)[index];
    
    setMaterial(newMaterial);
  }

  return (
    <motion.div 
      className='flex flex-col bg-white absolute right-5 top-1/2 -translate-y-1/2 z-[1] rounded-lg'
      initial={{ x: '120%' }}
      animate={{ x: selectedMeshes.length > 0 ? 0 : '120%' }}
    >
      <div className='font-visby text-black p-4'>
        <p className='text-[1.15rem] leading-[1rem] pt-1'>Colour</p>
      </div>
      <div className='p-3 border-t-[1px] border-t-black/15 border-solid flex flex-col gap-2'>
        <div className='p-3 rounded-lg border-black/50 border-solid border-[1px] flex flex-col gap-2'>
          <div className='flex items-center'>
            <img src='/images/icons/eyedropper.png' className='w-4 h-4'/>
            <p className='font-visby text-black px-2 pr-10 text-[0.85rem]'>Standard Colour</p>
          </div>
          <div className='flex gap-2'>
            {Object.values(MATERIALS).map(({color}, index) => (
              <div key={index} onClick={() => onNewSelection(index)} className={`w-8 h-8 rounded-full border-black/15 border-[1px] border-solid cursor-pointer outline-offset-[3px] outline-black ${selected === index && 'outline'}`} style={{ backgroundColor: color }}></div>
            ))  
            }
          </div>
        </div>
        <div className='p-3 rounded-lg border-black/50 border-solid border-[1px] flex flex-col gap-2 opacity-25'>
          <div className='flex items-center'>
            <img src='/images/icons/colours.png' className='w-4 h-4'/>
            <p className='font-visby text-black px-2 pr-10 text-[0.85rem]'>Custom Colour</p>
          </div>
        </div>
        <div className='p-3 rounded-lg border-black/50 border-solid border-[1px] flex flex-col gap-2 opacity-25'>
          <div className='flex items-center'>
            <img src='/images/icons/stamp.png' className='w-4 h-4'/>
            <p className='font-visby text-black px-2 pr-10 text-[0.85rem]'>All Over Print</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}