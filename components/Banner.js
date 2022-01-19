import Image from "next/image"
import Header from "./Header"

function Banner() {
    return (
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
            <Image src="/sunny1.JPEG" layout="fill" objectFit="cover"/>

            {/* <div>
                <Header />
            </div> */}
            <div className=" absolute top-1/2 w-full text-center">
                <p className="font-bold text-red-400">最高の温泉をお探しですか？</p>

                <button className="
                    font-bold text-white border-2 rounded-full 
                    px-4 py-2 my-3 
                    shadow-md hover:shadow-xl hover:bg-red-400
                    active:scale-90 
                    transition duration-150
                ">ここにあります</button>
            </div>
        </div>
    )
}

export default Banner
