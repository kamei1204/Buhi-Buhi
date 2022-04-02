import { useEffect, useState } from "react"



function fetchApi() {

    const [data, setData] = useState([])

    const apiGet = () => {
        fetch('https://app.rakuten.co.jp/services/api/Travel/HotelRanking/20170426?format=json&genre=all&applicationId=1070278709261281218')
        .then((res) => res.json())
        .then((json) => {
            console.log(json)
            setData(json);
        });
    };

    useEffect(() => {
        apiGet();
    },[])

    return (
        <div className="flex justify-center items-center flex-col mt-32">
            My Api <br />

            <button className="px-3 py-1 border-2 solid rounded-lg " onClick={apiGet}>fetch Api</button>
            <br />
            {/* {JSON.stringify(data, null, 2)} */}

            <div>
                <ul>
                    {data.map((item) => (
                        <li key={item.title}>{item.Ranking}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default fetchApi
                        
