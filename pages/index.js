import Header from "../components/Header"
import Banner2 from "../components/Banner2"
import SmallCard from "../components/SmallCard"
import MediumCard from "../components/MediumCard"
import LargeCard from "../components/LargeCard"
import Footer from "../components/Footer"
import Head from 'next/head'


export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
      <title>BuHiBuHi</title>
      </Head>

      <Header />
      <Banner2/>

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">近くの温泉を探す</h2>

          {/* pull some data from a server -API endpoints- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              { exploreData?.map(({img, location, distance}) => (
                <SmallCard 
                  key={img}
                  img={img}
                  location={location}
                  distance={distance}
                />

              ))}
            </div>
          </section>

          <section>
            <h2 className="text-4xl font-semibold py-8">泊まれる温泉のお宿</h2>

            <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 ml-3">
            {cardsData?.map(({img, title}) => (
              <MediumCard 
                key={img}
                img={img}
                title={title}
              />
            ))}

            </div>
          </section>

          <LargeCard 
            img="/sunny3.JPEG"
            title=""
            description="curated by sunny code"
            buttonText="さぁ最高の旅へ"
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
  

