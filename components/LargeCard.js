import Image from "next/image"

function LargeCard({img,title,description,buttonText}) {
    return (
        <section className="relative py-14 cursor-pointer">
            <div className="relative h-96 min-w-[300px]">
                <Image 
                    src={img} layout="fill" objectFit="cover" className="rounded-2xl"
                />
            </div>
            <div className="absolute top-60 left-8">
                <h3 className="text-2xl mb-3 w-64">{title}</h3>
                <h3>{description}</h3>

                <button className="text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5">{buttonText}</button>

            </div>

        </section>
    )
}

export default LargeCard
