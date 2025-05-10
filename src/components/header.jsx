import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

// import { categories } from '../utils/mock-data';

import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { GifState } from "../context/gif-context";

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);

    const { gifApiKey } = GifState();

    const fetchGifCategories = async () => {
        const response = await fetch(`https://api.giphy.com/v1/gifs/categories?api_key=${gifApiKey}`);
        const data = await response.json();
        // console.log(data);
        setCategories(data);

        return data;
    };

    useEffect(() => {
        fetchGifCategories();
    }, []);

    return (
        <nav>
            <div className="relative flex gap-4 justify-between items-center mb-2">
                <Link to={"/"} className="flex gap-2">
                    {/* <img src="/logo.svg" alt="Giphy Logo" className="w-8" /> */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight cursor-pointer animated-logo">
                        Giphy Search
                    </h1>
                </Link>

                <div className="font-bold text-md flex gap-2 items-center">
                    {categories?.data?.slice(0, 5).map((category) => {
                        return (
                            <Link
                                className="px-4 py-1 transition ease-in-out hover-gradient border-b-4 hidden lg:block"
                                key={category.name}
                                to={`/${category.name_encoded}`}
                            >
                                {category.name}
                            </Link>
                        );
                    })}

                    <button className="cursor-pointer hover-gradient hidden lg:block" onClick={() => setShowCategories(!showCategories)}>
                        <HiEllipsisVertical
                            size={35}
                            className={`py-0.5 transition ease-in-out ${showCategories ? "gradient" : ""} border-b-4`}
                        />
                    </button>

                    {/* -- Mobile UI -- */}
                    <button className="block lg:hidden" onClick={() => setShowCategories(!showCategories)}>
                        <HiMiniBars3BottomRight
                            className="text-sky-400"
                            size={30}
                        />
                    </button>
                    {/* -- Mobile UI -- */}
                </div>

                {showCategories && (
                    <div className={`absolute right-0 top-12 md:top-16 lg:top-20 px-10 pt-6 pb-9 w-full gradient z-20 rounded-[8px] overflow-hidden transition-opacity transition-transform duration-250 ease-[cubic-bezier(0.16, 1, 0.3, 1)] ${showCategories ? 'max-h-screen opacity-100 transform-[scale(1)_translateY(0)]' : 'max-h-0 opacity-0 transform-[scale(.99)_translateY(-.7em)]'}`}>
                        <span className="text-3xl font-extrabold">Categories</span>
                        <hr className="bg-gray-100 opacity-50 my-5" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {categories?.data?.map((category) => {
                                return (
                                    <Link
                                        onClick={() => setShowCategories(false)}
                                        className="transition ease-in-out font-bold text-neutral-50"
                                        key={category.name}
                                        to={`/${category.name_encoded}`}
                                    >
                                        {category.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;