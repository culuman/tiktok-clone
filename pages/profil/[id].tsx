import { useState, useEffect } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'

import VideoKartica from '@/komponente/VideoKartica'
import NemaRezultata from '@/komponente/NemaRezultata'
import { IKorisnik, Video } from '@/types'
import { BASE_URL } from '@/utils'

interface IProps {
    data: {
        user: IKorisnik,
        userVideos: Video[],
        userLikedVideos: Video[]
    }
}

const Profil = ({ data }: IProps) => {

    const { user, userVideos, userLikedVideos } = data;

    const [prikaziVideo, setPrikaziVideo] = useState(true);
    const [listaVidea, setListaVidea] = useState<Video[]>([]);
    const videi = prikaziVideo ? 'border-b-2 border-black' : 'text-gray-400'
    const liked = !prikaziVideo ? 'border-b-2 border-black' : 'text-gray-400'

    useEffect(() => {
        if(prikaziVideo) {
            setListaVidea(userVideos);
        } else {
            setListaVidea(userLikedVideos);
        }
    }, [prikaziVideo, userVideos, userLikedVideos])

    return (
        <div className="w-full">
        <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
            <div className="w-16 h-16 md:w-32 md:h-32">
                <Image src={user.slika} width={120} height={120} className="rounded-full" alt="profilna slika" layout="responsive" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase">{user.korisnickoIme.replaceAll(' ', '')}
                <GoVerified className="text-blue-400"/>
                </p>
                <p className="md:text-lg capitalize text-gray-400 text-xs">
                  {user.korisnickoIme}
                </p>
              </div>
        </div>

        <div>
            <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${videi}`} onClick={() => setPrikaziVideo(true)}>Videi</p>
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={() => setPrikaziVideo(false)}>Liked</p>
            </div>
            <div className="flex gap-6 flex-wrap md:justify-start">
                {listaVidea.length > 0 ? (
                    listaVidea.map((post: Video, idx: number) => (
                        <VideoKartica post={post} key={idx} />
                    ))
                ) : <NemaRezultata text={`Nema ${prikaziVideo ? ''
                : 'Liked'} Videa`} />}
            </div>
        </div>

        </div>
    )
}

export const getServerSideProps = async ({ params: { id }}: {
    params: { id: string }
} ) => {
    const res = await axios.get(`${BASE_URL}/api/profil/${id}`)

    return {
        props: { data: res.data }
    }
}

export default Profil;