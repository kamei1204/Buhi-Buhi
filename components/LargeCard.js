import Image from "next/image"
import { useRouter } from "next/router"

function LargeCard({img,title,description,buttonText}) {
    const router = useRouter();
    return (
        <section className="relative py-10 cursor-pointer">
            <div className="relative h-[500px] md:h-[600px] min-w-[300px]">
                <Image 
                    src={img} layout="fill" objectFit="cover" className="rounded-2xl"
                />
            </div>
            <div className="absolute top-[80px] left-[32px]">
                <h3 className="text-4xl lg:text-5xl text-white font-semibold mb-3 w-64 lg:w-[500px]">{title}</h3>
                <h3 className="text-white">{description}</h3>
            </div>
            <div className="absolute bottom-[80px] left-[30px]">
                <button onClick={() => router.push("/Blog")} className="text-md text-black font-bold bg-white px-6 py-4 rounded-lg border-2 border-white hover:bg-gray-200">{buttonText}</button>
            </div>

        </section>
    )
}

export default LargeCard



