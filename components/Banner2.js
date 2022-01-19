import Image from "next/image"

import styles from "../styles/Img.module.css"
import Header from "./Header"

function Banner2() {
    return (
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] bg-hero-pattern bg-cover bg-center flex items-center justify-center" >
            <div className="absolute top-0 left-0 overflow-hidden w-full h-full">
                <Image src="/cloud1.png" layout="fill" className={styles.img}/>
                <Image src="/cloud2.png" layout="fill" className={styles.img2}/>
                <Image src="/cloud3.png" layout="fill" className={styles.img3}/>
                {/* <Image src="/cloud4.png" layout="fill" className={styles.img}/>
                <Image src="/cloud5.png" layout="fill" className={styles.img}/>
                <Image src="/cloud1.png" layout="fill" className={styles.img}/>
                <Image src="/cloud2.png" layout="fill" className={styles.img}/>
                <Image src="/cloud3.png" layout="fill" className={styles.img}/>
                <Image src="/cloud4.png" layout="fill" className={styles.img}/>
                <Image src="/cloud5.png" layout="fill" className={styles.img}/> */}
    
            </div>
            
            {/* <div>
                <Header />
            </div> */}
            {/* <div className=" absolute top-1/2 w-full text-center">
                <p className="font-bold text-red-400">最高の温泉をお探しですか？</p>

                <button className="
                    font-bold text-white border-2 rounded-full 
                    px-4 py-2 my-3 
                    shadow-md hover:shadow-xl hover:bg-red-400
                    active:scale-90 
                    transition duration-150
                ">ここにあります</button>
            </div> */}
        </div>
    )
}

export default Banner2