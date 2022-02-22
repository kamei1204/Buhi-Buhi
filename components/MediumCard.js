import Image from "next/image";

function MediumCard({img, title, description}) {
    return (
        
        <div className="cursor-pointer hover:scale-105 transition transform duration-300 ease-out mt-5">
                <div className="relative h-[350px] w-[250px] md:h-[300px] md:w-[200px] lg:h-[400px] lg:w-[300px] ">
                    <Image src={img} layout="intrinsic" width={300} height={280} className="rounded-lg"/>
                    <div className="absolute bottom-0 h-[170px] w-full bg-red-400 rounded-b-lg"></div>
                    <div className="absolute bottom-[90px] mt-10 ml-3 text-white">
                        <h2 className="text-3xl">{title}</h2>
                        <h3 className="text-2xl">{description}</h3>
                    </div>
                </div>
        </div>
    )
}

export default MediumCard;

