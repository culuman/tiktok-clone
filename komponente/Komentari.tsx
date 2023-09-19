import React from 'react'
import { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import useAuthStore from '@/store/authStore'
import NemaRezultata from './NemaRezultata'
import { IKorisnik } from '@/types'

interface IProps {
  komentarisanje: boolean;
  komentar: string;
  setKomentar: Dispatch<SetStateAction<string>>;
  dodajKomentar: (e: React.FormEvent) => void;
  komentari: IKomentar[];
}

interface IKomentar {
  komentar: string;
  length?: number;
  _key: string;
  postavio: { _ref?: string; _id?: string;}
}

const Komentari = ({ komentar, setKomentar, dodajKomentar, komentari, komentarisanje }: IProps) => {
  const { userProfile, sviKorisnici } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {komentari?.length ? (
          komentari.map((item, idx) => (
            <>
              {sviKorisnici.map((korisnik: IKorisnik) => (
                korisnik._id === (item.postavio._id || item.postavio._ref)
                && (
                  <div className="p-2 items-center" key={idx}>
                    <Link href={`/profil/${korisnik._id}`}>
                      <div className="flex items-start gap-3">
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
                    <div>
                      <p>{item.komentar}</p>
                    </div>
                  </div>
                )
              ))}
            </>
          ))
        ) : (
          <NemaRezultata text="Jos uvek nema komentara"/>
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={dodajKomentar} className="flex gap-4">
            <input 
              value={komentar} onChange={(e) => setKomentar(e.target.value)} placeholder="Dodajte komentar..."
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[350px] md:w-[700px] 
              lg:w-[400px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button className="text-md text-gray-400" onClick={dodajKomentar}>
              {komentarisanje ? 'Komentarisanje...' : 'Komentarisi'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Komentari