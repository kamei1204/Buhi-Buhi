import Header from "../components/Header"
import Footer from "../components/Footer"
import { useRouter } from "next/router"
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";






function Search({ searchResults }) {
    const router = useRouter();

    console.log(searchResults);
    const { location, startDate, endDate, noOfGests} = router.query;

    const formattedStartDate = format(new Date(startDate), "dd MMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMM yy");

    const range = `${formattedStartDate} - ${formattedEndDate} `; 


    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${noOfGests}`}/>
            <main className="flex">
                <section className="pt-14 px-6 flex-grow">
                    <p className="text-xs">300+ stays - {range} - for {noOfGests} number of guests </p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6"> Stays in {location}</h1>
                    <div className="hidden lg:inline-flex space-x-4 mb-5 ml-5">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More Filters</p>
                    </div>
                    <div className="flex flex-col">
                    {searchResults.map(({img,location,title,description,star,price,total }) => (
                        <InfoCard 
                            key={img}
                            img={img}
                            location={location}
                            title={title}
                            description={description}
                            star={star}
                            price={price}
                            total={total}
                        />
                    ))}
                    </div>


                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Search

export async function getServerSideProps() {
    const searchResults = await fetch("https://links.papareact.com/isz")
    .then(res => res.json());

    return {
        props: {
            searchResults,
        },
    };
}