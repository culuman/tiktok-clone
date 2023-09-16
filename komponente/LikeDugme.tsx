import React from 'react'
import { useState, useEffect } from 'react'
import { MdFavorite } from 'react-icons/md'

import useAuthStore from '@/store/authStore'

interface IProps {
    handleLajk: () => void;
    handleDislajk: () => void;
    likes: any[];
}

const LikeDugme = ({ handleLajk, handleDislajk, likes}: IProps) => {
  const [vecLajkovano, setVecLajkovano] = useState(false);
  const { userProfile }: any = useAuthStore();
  let filterLajkova = likes?.filter((item: any) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLajkova?.length > 0) {
      setVecLajkovano(true);
    } else {
      setVecLajkovano(false);
    }
  }, [filterLajkova, likes]);

  return (
    <div className=" flex gap-6">
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {vecLajkovano ? (
          <div className='bg-primary rounded-full p-2 md:p-4 text-[#F51997] ' onClick={handleDislajk} >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        ) : (
          <div className='bg-primary rounded-full p-2 md:p-4 ' onClick={handleLajk} >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        )}
        <p className='text-md font-semibold '>{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeDugme