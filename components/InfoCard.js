import { HeartIcon, StarIcon } from "@heroicons/react/solid"
import Image from "next/image"

function InfoCard({img, location, title, description, star, price, total}) {
    return (
        <div className="
                flex 
                py-7 px-2 border-b 
                hover:opacity-80 hover:shadow-lg first:border-t
                transition transform duration-200 ease-out ">
            <div className="relative w-40 h-24 md:h-52 md:w-80 flex-shrink-0 mb-5">
            <Image src={img} layout="fill" objectFit="cover" className="rounded-lg"/>
            </div>

            <div className="flex flex-col flex-grow pl-5">
                <div className="flex justify-between">
                    <p className="text-sm text-gray-400">{location}</p>
                    <HeartIcon className="h-7 cursor-pointer"/>
                </div>

                <h4 className="text-xl">{title}</h4>

                <div className="border-b w-10 pt-2"/>
                <p className="text-gray-400 text-sm pt-2 flex-grow">{description}</p>

                <div className="flex justify-between pt-5">
                    <p className="flex items-center"> 
                        <StarIcon className="h-7 text-red-400"/>
                        {star}
                    </p>
                    <div>
                    <p className="text-lg lg:text-2xl font-semibold pb-2">{price}</p>
                    <p className="text-right font-extralight">{total}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard

