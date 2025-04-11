import { Link } from "react-router-dom";
import { useState } from 'react';

import { categories } from '../utils/mock-data';

const Header = () => {

    const [showCategories, setShowCategories] = useState(false);

    return (
        <nav>
            <div className="relative flex gap-4 justify-between items-center mb-2">
                <Link to={"/"} className="flex gap-2">
                    {/* <img src="/logo.svg" alt="Giphy Logo" className="w-8" /> */}
                    <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
                        Giphy Search
                    </h1>
                </Link>

                <div className="font-bold text-md flex gap-2 items-center">
                    {categories?.data?.slice(0, 5).map((category) => {
                        return (
                            <Link
                                className="px-4 py-1 transition ease-in-out hover:gradient border-b-4 hidden lg:block"
                                key={category.name}
                                to={`/${category.name_encoded}`}
                            >
                                {category.name}
                            </Link>
                        );
                    })}

                    <button className={`py-0.5 transition ease-in-out hover:gradient ${showCategories ? "gradient" : ""} border-b-4 cursor-pointer hidden lg:block`} onClick={() => setShowCategories(!showCategories)}>
                        {`[-]`}
                    </button>

                    {/* -- Mobile UI -- */}
                    <button className="text-sky-400 block lg:hidden" onClick={() => setShowCategories(!showCategories)}>
                        {`[X]`}
                    </button>
                    {/* -- Mobile UI -- */}
                </div>

                {showCategories && (
                    <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
                        <span className="text-3xl font-extrabold">Categories</span>
                        <hr className="bg-gray-100 opacity-50 my-5" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {categories?.data?.map((category) => {
                                return (
                                    <Link
                                        onClick={() => setShowCategories(false)}
                                        className="transition ease-in-out font-bold"
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
    )
};

export default Header;