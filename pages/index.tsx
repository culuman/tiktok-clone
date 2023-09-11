import axios from 'axios'
import { Video } from '@/types.d'
import VideoCard from '@/komponente/VideoCard';
import NemaRezultata from '@/komponente/NemaRezultata';

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
  const { data } = await axios.get(`http://localhost:3000/api/post`);

  return {
    props: {
      videos: data
    }
  }
}
