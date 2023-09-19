import React from 'react'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import useAuthStore from '@/store/authStore'
import { IKorisnik } from '@/types'

const PredlozeniProfili = () => {
  const { fetchAllUsers, sviKorisnici } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">Predlozeni profili</p>

      <div>
        {sviKorisnici.slice(0, 5).map((korisnik: IKorisnik) => (
          <Link href={`/profil/${korisnik._id}`} key={korisnik._id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
              <div className="w-8 h-8">
                <Image src={korisnik.slika} width={34} height={34} className="rounded-full" alt="profilna slika" layout="responsive" />
              </div>
              <div className="hidden xl:block">
                <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">{korisnik.korisnickoIme.replaceAll(' ', '')}
                <GoVerified className="text-blue-400"/>
                </p>
                <p className="capitalize text-gray-400 text-xs">
                  {korisnik.korisnickoIme}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PredlozeniProfili