import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useAuthStore from '@/store/authStore'
import VideoKartica from '@/komponente/VideoKartica'
import NemaRezultata from '@/komponente/NemaRezultata'
import { IKorisnik, Video } from '@/types'
import { BASE_URL } from '@/utils'

const Pretraga = ({ videi }: {videi: Video[]}) => {

    const [isProfil, setIsProfil] = useState(false);
    const router = useRouter();
    const { pretragaVrednost }: any = router.query;
    const { sviKorisnici } = useAuthStore();

    const profil = isProfil ? 'border-b-2 border-black' : 'text-gray-400'
    const video = !isProfil ? 'border-b-2 border-black' : 'text-gray-400'

    const pretrazeniProfili = sviKorisnici.filter((korisnik: IKorisnik) => korisnik.korisnickoIme.toLowerCase().includes(pretragaVrednost.toLowerCase()));

  return (
    <div className="w-full">
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${profil}`} onClick={() => setIsProfil(true)}>Profili</p>
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${video}`} onClick={() => setIsProfil(false)}>Videi</p>
        </div>
        {isProfil ? (
            <div className="md:mt-16">
                {pretrazeniProfili.length > 0 ? (
                    pretrazeniProfili.map((korisnik: IKorisnik, idx: number) => (
                        <Link href={`/profil/${korisnik._id}`} key={idx}>
                            <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                                <div>
                                <Image src={korisnik.slika} width={50} height={50} className="rounded-full" alt="profilna slika" />
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
                    ))
                ) : <NemaRezultata text={`Nema rezultata za ${pretragaVrednost}`} />}
            </div>
        ) : <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
                {videi.length ? (
                    videi.map((post: Video, idx: number) => (
                        <VideoKartica post={post} key={idx} />
                    ))
                ) : <NemaRezultata text={`Nema rezultata za ${pretragaVrednost}`} />}
            </div>}
    </div>
  )
}

export const getServerSideProps = async ({ params: { pretragaVrednost }}: {
    params: { pretragaVrednost: string }
} ) => {
    const res = await axios.get(`${BASE_URL}/api/pretraga/${pretragaVrednost}`)

    return {
        props: { videi: res.data }
    }
}

export default Pretraga