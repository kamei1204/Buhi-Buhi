import Image from "next/image";

function MediumCard({img, title}) {
    return (
        
        <div className="cursor-pointer hover:scale-105 transition transform duration-300 ease-out ">
                <div className="relative h-80 w-80 ">
                    <Image src={img} layout="fill" className="rounded-xl"/>
                    <h3 className="mt-3 text-xl">{title}</h3>
                </div>
        </div>
    )
}

export default MediumCard;
