import Image from "next/image"
import { useRouter } from "next/router"

function LargeCard2({img,title,description,buttonText}) {
    const router = useRouter();
    return (
        <div className="relative flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer">
            <div className=" h-[600px] w-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
                <Image 
                    src={img} layout="fill" objectFit="cover" className="rounded-2xl"
                />
            </div>
            <div className="absolute top-10">
                <h3 className="text-4xl mb-3 w-64 text-white">{title}</h3>
                <h3 className="text-white">{description}</h3>

                <button onClick={() => router.push("/Core")} className="text-sm text-white bg-transparent px-4 py-2 rounded-lg border-2 border-white hover:bg-red-400">{buttonText}</button>

            </div>
        </div>
    )
}


export default LargeCard2
