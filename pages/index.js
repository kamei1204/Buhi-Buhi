import Header from "../components/Header"
import Banner2 from "../components/Banner"
// import SmallCard from "../components/SmallCard"
import MediumCard from "../components/MediumCard"
import LargeCard from "../components/LargeCard"
import LargeCard2 from "../components/LargeCard2"
import Footer from "../components/Footer"
import Head from 'next/head'
import { useInView } from 'react-intersection-observer';
import 'animate.css';


export default function Home() {

  const { ref, inView } = useInView({
    // オプション
    rootMargin: '-50px', // ref要素が現れてから50px過ぎたら
    triggerOnce: true, // 最初の一度だけ実行
  });

  return (
    <div className="">
      
      <Head>
      <title>BuHiBuHi</title>
      </Head>
      

      <div className="sm:bg-gray-900 lg:p-10 ">
        <Header/>
        <Banner2/>
      </div>
      

      
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
      
      <section>
            <h2 className="text-2xl md:text-3xl lg:text-4xl mt-7 font-bold">次にいく旅のアイデアを見つけよう</h2>
            {/* <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 ml-3">
            {cardsData?.map(({img, title}) => (
              <MediumCard 
                key={img}
                img={img}
                title={title}
              />
            ))} */}
            <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 ml-3">
              <MediumCard 
                img="/ita.JPEG"
                title="大分"
                description="目的地まで22km"
              />
              <MediumCard 
                img="/osaka.JPEG"
                title="大阪"
                description="目的地まで1km"
              />
              <MediumCard 
                img="/fukuoka.JPEG"
                title="福岡"
                description="目的地まで5km"
              />
              <MediumCard 
                img="/okayama.JPEG"
                title="岡山"
                description="目的地まで3km"
              />
              <MediumCard 
                img="/kumamoto.JPEG"
                title="熊本"
                description="目的地まで11km"
              />
              </div>
          </section>
        <section ref={ref} className="pt-6">
        {inView && (
          <div
            className="animate__animated animate__fadeInUp"
          >
            <h2  className="text-2xl md:text-3xl lg:text-4xl mt-7 font-bold">素敵な体験をしよう</h2>
          </div>
        )}
        {/* <h2  className="text-2xl md:text-3xl lg:text-4xl mt-7 font-bold">素敵な体験をしよう</h2> */}
          {/* <h2 className="text-4xl font-semibold pb-5">近くの温泉を探す</h2> */}

          {/* pull some data from a server -API endpoints- */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              { exploreData?.map(({img, location, distance}) => (
                <SmallCard 
                  key={img}
                  img={img}
                  location={location}
                  distance={distance}
                />

              ))}
            </div> */}
        
            <div className="grid grid-cols-1 md:grid-cols-2">
              <LargeCard2 
                  img="/sunnyCard1.jpg"
                  title="旅行中の体験を共有"
                  description="curated by sunny code"
                  buttonText="共有する"
              />
              <LargeCard2 
                  img="/sunnyCard3.jpg"
                  title="旅行中に楽しめる体験"
                  description="curated by sunny code"
                  buttonText="近くでできる体験"
              />

            </div>
          </section>
          {/* <div ref={ref} style={{ height: '50px' }}>
        {inView && (
          <div
            className="animate__animated animate__fadeInUp"
            style={{ backgroundColor: 'yellow' }}
          >
            <p>黄色の要素が出現</p>
          </div>
        )}

          </div> */}
          <LargeCard 
            img="/sunny10.JPEG"
            title="ワンちゃんと泊まれるお宿をぜひ教えてください"
            // description=""
            buttonText="ご連絡をお待ちしております"
            />

            </main>
            
        <Footer />
        </div>
    );
  }
  
  export async function getStaticProps() {
    const exploreData = await fetch("https://links.papareact.com/pyp").
    then((res) => res.json()
    );

    const cardsData = await fetch("https://links.papareact.com/zp1").
    then((res) => res.json()
    );
  
    return {
      props:{ exploreData, cardsData }
    }
  
  
  }
  

