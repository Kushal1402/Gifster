import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { GifState } from "../context/gif-context";

const filters = [
    {
        title: "GIFs",
        value: "gifs",
        background: "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
    },
    {
        title: "Stickers",
        value: "stickers",
        background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
    },
    {
        title: "Text",
        value: "text",
        background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
    },
];

const FilterGifs = ({ showTrendingIcon = false }) => {
    const { filter, setFilter } = GifState();

    return (
        <>
            <div className={`flex my-3 gap-3 ${showTrendingIcon ? "flex-col sm:flex-row sm:items-center justify-between" : ""}`}>
                {showTrendingIcon && (
                    <span className="flex gap-2 items-center text-sky-400 font-bold text-md">
                        <HiMiniArrowTrendingUp size={25} className="text-teal-400" />
                        <p className="text-sky-400 font-semibold text-md">Trending</p>
                    </span>
                )}
                <div className="flex min-w-80 rounded-full bg-gray-800">
                    {filters.map((f) => {
                        return (
                            <span
                                onClick={() => setFilter(f.value)}
                                className={`${filter === f.value ? f.background : ""} font-semibold py-2 w-1/3 text-center rounded-full cursor-pointer `}
                                key={f.title}
                            >
                                {f.title}
                            </span>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
export default FilterGifs;