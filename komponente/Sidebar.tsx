import React from 'react'
import { useState } from 'react'
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GoogleLogin from 'react-google-login'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { GiButtonFinger } from 'react-icons/gi';
import Otkrijte from './Otkrijte';
import PredlozeniProfili from './PredlozeniProfili';
import Footer from './Footer';

const Sidebar = () => {
  const [prikaziSidebar, setPrikazeSidebar] = useState (true);

  const profil = false;

  const normalanLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded';

  return (
    <div>
      <div className="block xl:hidden m-2 ml-4 mt-3 text-xl" onClick={() => setPrikazeSidebar ((prev) => !prev)}>
        {prikaziSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
       </div>
       {prikaziSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={normalanLink}>
                <p className="text-2xl"><AiFillHome /></p>
                <span className="text-xl hidden xl:block">Za Vas</span>
              </div>
            </Link>
          </div>
        <Otkrijte />
        <PredlozeniProfili />
        <Footer />
      </div>
      )}
    </div>
  )
}

export default Sidebar