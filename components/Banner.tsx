import Image from "next/image"
import Router from "next/router"

import styles from "../styles/Img.module.css"


function Banner2() {
    return (
        <div className="relative h-[600px] sm:h-[500px] lg:h-[500px] lg:m-[30px] xl:h-[700px] 2xl:h-[700px] 2xl:m-[1000px] bg-hero-pattern  bg-center flex items-center justify-center" >
            <div className="absolute bottom-0 overflow-hidden w-full h-[200px] md:h-[200px] lg-[400px]">
                <Image src="/cloud1.png" layout="fill" className={styles.img}/>
                <Image src="/cloud2.png" layout="fill" className={styles.img}/>
                <Image src="/cloud3.png" layout="fill" className={styles.img3}/>
                <Image src="/cloud3.png" layout="fill" className={styles.img3}/>
                <Image src="/cloud3.png" layout="fill" className={styles.img2}/>
                <Image src="/cloud3.png" layout="fill" className={styles.img2}/>
                <Image src="/cloud4.png" layout="fill" className={styles.img}/>
                <Image src="/cloud5.png" layout="fill" className={styles.img1}/>
                <Image src="/cloud1.png" layout="fill" className={styles.img}/>
                <Image src="/cloud2.png" layout="fill" className={styles.img3}/>
            </div>
            <div className=" absolute top-2/4 w-full text-center">
                <p className="font-bold text-white text-4xl">犬も入れる温泉をお探しですか？</p>

                <button 
                    onClick={() => Router.push("/Ranking")}
                    className="
                        font-bold text-white border-2 rounded-full
                        px-3 py-2 my-3 
                        shadow-md hover:shadow-xl hover:bg-red-400
                        active:scale-90 
                        transition duration-150"
                >ここにあります
                </button>
            </div>
        </div>
    )
}

export default Banner2