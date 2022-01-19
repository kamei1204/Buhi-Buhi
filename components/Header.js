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
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-transparent shadow-md p-2 md:px-10">
            {/* left */}
            <div 
                onClick={() => router.push("/")}
                className="relative flex items-center h-6 cursor-pointer my-auto w-25">
                <Image 
                    src="/BuHiBuHi.png" 
                    layout="fill" 
                    objectFit="contain" 
                    objectPosition="left"/>
            </div>

            {/* middle */}
            <div className="flex items-center md:border-2 md:shadow-sm rounded-full py-2 border-gray-200">
                <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)} 
                className="flex-grow pl-5 bg-transparent  outline-none text-sm text-purple-300 placeholder-purple-300" type="text" placeholder={placeholder || "温泉宿はこちらから"} />
                <SearchIcon className="hidden md:inline-flex md:mx-2 h-8 bg-red-400 rounded-full text-white p-2 cursor-pointer"/>
            </div>
            {/* right */}
            <div className="flex space-x-4 items-center justify-end text-purple-300">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer"/>

            <div className="flex space-x-2 items-center border-2 rounded-full p-2 border-gray-200">
                <MenuAlt4Icon className="h-6 cursor-pointer"/>
                <UserCircleIcon className="h-6 cursor-pointer"/>
            </div>
            </div>

            {searchInput && (
            <div className="flex flex-col col-span-3 mx-auto">
                <DateRangePicker ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={"#FD5861"}
                onChange={handleSelect}
                />
                <div className="flex items-center border-b mb-4 ">
                    <h2 className="text-2xl flex-grow font-semibold">宿泊のご人数</h2>

                    <UsersIcon className="h-5 "/>
                    <input
                    value={noOfGests}
                    onChange={(e) => setNoOfGests(e.target.value)} 
                    min={1}
                    type="number" 
                    className="w-12 pl-2 text-lg outline-none text-red-300"/>
                </div>
                {/* emmet for react */}
                <div className="flex">
                    <button onClick={resetInput} className="flex-grow text-gray-500">Cancel</button>
                    <button onClick={search} className="flex-grow text-red-300">Search</button>
                </div>
            </div>
            )}
        </header>
    );
}

export default Header;
            

