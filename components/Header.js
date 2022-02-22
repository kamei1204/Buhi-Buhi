import Image from "next/image";
import { GlobeAltIcon, MenuAlt4Icon, SearchIcon, UserCircleIcon, UsersIcon } from "@heroicons/react/solid"
import { useState } from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
// import { Calendar } from 'react-date-range';
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/router";

function Header({ placeholder }) {
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGests, setNoOfGests] = useState(1);
    const router = useRouter();
    

    
    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }
    
    const resetInput = () => {
        setSearchInput("");
    }
    
    const search = () => {
        router.push({
            pathname: "/search",
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGests,
            },
        });
    };
    
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-gray-200 shadow-md p-2 md:px-10 sm:bg-transparent">
            {/* left */}
            <div 
                onClick={() => router.push("/")}
                className="relative hidden sm:flex items-center h-6 cursor-pointer my-auto w-25 ">
                <Image 
                    src="/BuHiBuHi.png" 
                    layout="fill" 
                    objectFit="contain" 
                    objectPosition="left"/>
            </div>

            {/* middle */}
            <div className="flex items-center justify-center sm:border-2 md:border-2 md:shadow-sm rounded-full py-2 border-gray-200 sm:bg-white">
                <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)} 
                className="flex-grow sm:pl-5 ml-80 sm:ml-0 bg-white sm:bg-transparent rounded-full pr-28 pl-28 pt-3 pb-3 border-2 sm:p-0 sm:border-none border-amber-300 text-sm sm:border-transparent text-purple-400  sm:outline-none" type="text" placeholder={placeholder || "行き先はどこですか？"} />
                <SearchIcon className="hidden sm:inline-flex sm:mx-0 h-8 bg-red-400 rounded-full text-white p-2 cursor-pointer outline-none"/>
            </div>
            {/* right */}
            <div className="hidden sm:flex space-x-4 items-center justify-end text-purple-300">
                {/* <p className="hidden md:inline cursor-pointer">Become a host</p> */}
                <GlobeAltIcon className="h-6 cursor-pointer"/>

            <div className=" sm:flex space-x-2 items-center border-2 rounded-full p-2 border-gray-200">
                <div onClick={() => router.push("/Login")}>
                    <UserCircleIcon className="h-6 cursor-pointer"/>
                </div>
                <MenuAlt4Icon  className="h-6 cursor-pointer"/>
            </div>
            </div>

            {searchInput && (
            <div className="flex flex-col col-span-3 md:mx-auto bg-white">
                <DateRangePicker ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={"#FD5861"}
                onChange={handleSelect}
                />
                <div className="flex items-center border-b mb-4 bg-white">
                    <h2 className="text-2xl flex-grow font-semibold ml-4">宿泊のご人数</h2>

                    <UsersIcon className="h-5"/>
                    <input
                    value={noOfGests}
                    onChange={(e) => setNoOfGests(e.target.value)} 
                    min={1}
                    type="number" 
                    className="w-12 pl-2 text-lg outline-none text-red-300"/>
                </div>
                {/* emmet for react */}
                <div className="flex bg-white">
                    <button onClick={resetInput} className="flex-grow text-gray-500">Cancel</button>
                    <button onClick={search} className="flex-grow text-red-300">Search</button>
                </div>
            </div>
            )}
        </header>
    );
}

export default Header;
            

