import axios from 'axios'
import { Video } from '@/types.d'
import VideoCard from '@/komponente/VideoCard';
import NemaRezultata from '@/komponente/NemaRezultata';
import { BASE_URL } from '@/utils';

interface IProps {
  videos: Video[]
}

export default function Home({ videos }: IProps) {
  console.log(videos);
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} key={video._id}/>
        ))
      ) : (
        <NemaRezultata text={'Nema videa'} />
      )}
    </div>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`);

  return {
    props: {
      videos: data
    }
  }
}