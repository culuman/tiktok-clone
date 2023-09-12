import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { SanityAssetDocument } from 'next-sanity'

import useAuthStore from '@/store/authStore'
import { client } from '@/utils/client'
import { teme } from '@/utils/constants'

const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
    const [pogresanTipFajla, setPogresanTipFajla] = useState(false);
    const [naslov, setNaslov] = useState('');
    const [kategorija, setKategorija] = useState(teme[0].name);
    const [cuvanje, setCuvanje] = useState(false);

    const { userProfile }: { userProfile: any } = useAuthStore();
    const router = useRouter();

    const uploadVideo = async (e: any) => {
        const odabraniFajl = e.target.files[0];
        const fajlTipovi = ['video/mp4', 'video/webm', 'video/ogg'];

        if(fajlTipovi.includes(odabraniFajl.type)) {
            client.assets.upload('file', odabraniFajl, {contentType: odabraniFajl.type, filename: odabraniFajl.name})
            .then((data) => {
                setVideoAsset(data);
                setIsLoading(false);
            })
        } else {
            setIsLoading(false);
            setPogresanTipFajla(true);
        }
    }

    const handlePost = async () => {
        if(naslov && videoAsset?._id && kategorija) {
            setCuvanje(true);

            const document = {
                _type: 'post',
                naslov,
                video: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: videoAsset?._id
                    }
                },
                korisnikId: userProfile?._id,
                postavio: {
                    _type: 'postavio',
                    _ref: userProfile?._id
                },
                tema: kategorija
            }

            await axios.post('http://localhost:3000/api/post', document);

            router.push('/');
        }
    }

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
        <div className="bg-white rounded-lg xl:h-[80vh] w-[60%] flex gap-6 flex-wrap justify-between items-center p-14 pt-6">
            <div>
                <div>
                    <p className="text-2xl font-bold">Postavite Video</p>
                    <p className="text-md text-gray-400 mt-1">Postavite video na vas profil</p>
                </div>
                <div className="border-dashed rounded-xl border-4 border-gray-200 flex 
                flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-[#F51997] hover:bg-gray-100">
                    {isLoading ? (
                        <p>Postavlja se...</p>
                    ) : (
                        <div>
                            {videoAsset ? (
                                <div>
                                    <video src={videoAsset.url} loop controls className="rounded-xl h-[450px] mt-16 bg-black">

                                    </video>
                                </div>
                            ) : (
                                <label className="curson-pointer">
                                    <div className="flex flex-col items-center justify-center h-full">
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="font-bold text-xl">
                                            <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                                        </p>
                                        <p className="text-xl font-semibold">Postavite Video</p>
                                    </div>
                                    <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                                        MP4, WebM ili ogg <br />
                                        720x1280 ili vise <br />
                                        Do 10 minuta <br />
                                        Manje od 2GB
                                    </p>
                                    <p className="bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none cursor-pointer">
                                        Odaberite fajl
                                    </p>
                                    </div>
                                    <input type="file" name="upload-video" onChange={uploadVideo} className="w-0 h-0" />
                                </label>
                            )}
                        </div>
                    )}
                    {pogresanTipFajla && (
                        <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
                        Odaberite video fajl
                        </p>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-3 pb-10">
                <label className="text-md font-medium">Naslov</label>
                <input type="text" value={naslov} onChange={(e) => setNaslov(e.target.value)} className="rounded outline-none text-md border-2 border-gray-200 p-2" />
                <label className="text-md font-medium">Kategorija</label>
                <select onChange={(e) => setKategorija(e.target.value)} className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer">
                    {teme.map((tema) => (
                        <option key={tema.name} className="outline-none capitalize bg-white text-gray-700 text-md p2 hover:big-slate-300" value={tema.name}>
                            {tema.name}
                        </option>
                    ))}
                </select>
                <div className="flex gap-6 mt-10">
                    <button onClick={() => {}} type="button" className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none">
                        Odbaci
                    </button>
                    <button onClick={handlePost} type="button" className="bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none">
                        Postavi
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Upload