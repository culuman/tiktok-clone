import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Video } from '@/types.d'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsPlay, BsFillPlayFill, BsFillPauseFill} from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'

interface IProps {
    post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {

    const [isHover, setIsHover] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);

    const onVideoClick = () => {
        if(playing) {
            videoRef?.current?.pause();
            setPlaying(false);
        } else {
            videoRef?.current?.play();
            setPlaying(true);
        }
    }

    useEffect(() => {
        if (videoRef?.current) {
          videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
        <div>
            <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
                <div className="md:w-16 md:h-16 w-10 h-10">
                    <Link href={`/profil/${post.postavio._id}`}>
                        <>
                        <Image width={62} height={62} className="rounded-full" src={post.postavio.slika} alt="Profilna slika" layout="responsive"/>
                        </>
                    </Link>
                </div>
                <div>
                    <Link href={`/profil/${post.postavio._id}`}>
                        <div className="flex items-center gap-2">
                            <p className="flex gap-2 items-center md:text-md font-bold text-primary">{post.postavio.korisnickoIme}
                            <GoVerified className="text-blue-500 text-md" />
                            </p>
                            <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">{post.postavio.korisnickoIme}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
            <div className="lg:ml-20 flex gap-4 relative">
                <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className="rounded-3xl">
                    <Link href={`/detalji/${post._id}`}>
                        <video loop ref={videoRef} className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100" src={post.video.asset.url}>

                        </video>
                    </Link>

                    {isHover && (
                        <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
                            {playing ? (
                               <button onClick={onVideoClick}>
                                    <BsFillPauseFill className="text-black text-2xl lg:text-4xl"/>
                               </button> 
                            ) : (
                                <button onClick={onVideoClick}>
                                    <BsFillPlayFill className="text-black text-2xl lg:text-4xl"/>
                                </button>
                            )}
                            {isMuted ? (
                               <button onClick={() => setIsMuted(false)}>
                                    <HiVolumeOff className="text-black text-2xl lg:text-4xl"/>
                               </button> 
                            ) : (
                                <button onClick={() => setIsMuted(true)}>
                                    <HiVolumeUp className="text-black text-2xl lg:text-4xl"/>
                                </button>
                            )}
                        </div>
                    )}

                </div>
            </div>
    </div>
  )
}

export default VideoCard