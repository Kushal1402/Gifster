import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { GifState } from "../context/gif-context";

// Theme colors for ghost loader items
const themeColors = [
    '#00CCFF',
    '#9733FF',
    '#FFF35C',
    '#FF6666',
    '#00FF99'
];

const Category = () => {

    const { category } = useParams();

    const { gifs, gifApiKey, gifApiBaseUrl, filter, updateGifs, loading, setLoading, resetPagination } = GifState();

    const firstGifData = gifs?.data[0]?.gif || {};

    const fetchCategoryResults = async () => {
        try {
            const response = await fetch(`${gifApiBaseUrl}${filter}/categories/${category}?api_key=${gifApiKey}`);
            const data = await response.json();
            updateGifs(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        resetPagination();
        fetchCategoryResults();
    }, [category]);

    return (
        <div className="flex flex-col sm:flex-row gap-5 my-4">

            <div className="w-full sm:w-85">

                {gifs?.data?.length > 0 && (
                    <div className="w-full mb-2 relative bg-png-pattern cursor-pointer group">
                        <img
                            src={firstGifData?.images?.fixed_width.webp}
                            srcSet={`
                                ${firstGifData?.images?.fixed_width_small?.webp} 100w,
                                ${firstGifData?.images?.fixed_width?.webp} 200w,
                                ${firstGifData?.images?.original?.webp} 480w,
                            `}
                            alt={firstGifData?.alt_text ? firstGifData?.alt_text : firstGifData?.title}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className={`w-full object-cover rounded transition-all duration-300 ${firstGifData?.type === "text" || firstGifData?.type === "sticker" ? "transparent-bg-stickers-text" : ""}`}
                            decoding="async"
                            width={firstGifData?.images?.original.width}
                            height={firstGifData?.images?.original.height}
                            loading="eager"
                        />

                        {gifs?.data[0]?.name && (
                            <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-transparent via-transparent to-black font-bold flex items-end gap-2 p-2 z-10">
                                <span>{gifs?.data[0]?.name}</span>
                            </div>
                        )}
                    </div>
                )}

                <p className="text-gray-400 text-lg mt-4">
                    Don&apos;t tell it to me, GIF it to me!
                </p>

                <div className="w-full h-0.5 mt-4 bg-gray-800" />
            </div>

            <div className="w-full">
                <h2 className="text-4xl pb-3 font-extrabold capitalize">
                    {category.split("-").join(" & ")} GIFs
                </h2>
                <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
                    @{category}
                </h2>

                {gifs?.data?.length > 0 && !loading ? (
                    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
                        {gifs.data.map((gif, idx) => (
                            <Link to={`/${gif?.gif?.type}s/${gif?.gif?.slug}`} key={gif?.gif?.id} className="block mb-2">
                                <div key={gif?.id} className="w-full mb-2 relative bg-png-pattern cursor-pointer group">
                                    <img
                                        src={gif?.gif?.images.fixed_width.webp}
                                        srcSet={`
                                            ${gif?.gif?.images.fixed_width_small.webp} 100w,
                                            ${gif?.gif?.images.fixed_width.webp} 200w,
                                            ${gif?.gif?.images.original.webp} 480w,
                                        `}
                                        alt={gif?.gif?.alt_text ? gif?.gif?.alt_text : gif?.gif?.title}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className={`w-full object-cover rounded transition-all duration-300 ${gif.gif?.type === "text" || gif.gif?.type === "sticker" ? "transparent-bg-stickers-text" : ""}`}
                                        decoding="async"
                                        width={gif?.gif?.images.original.width}
                                        height={gif?.gif?.images.original.height}
                                        loading="lazy"
                                        style={{
                                            background: gif?.gif?.type !== "text" && gif?.gif?.type !== "sticker" ? themeColors[idx % themeColors.length] : ""
                                        }}
                                    />

                                    {gif?.gif?.user?.display_name && (
                                        <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-transparent via-transparent to-black font-bold flex items-end gap-2 p-2 z-10">
                                            <span>{gif?.gif?.user?.display_name}</span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : loading ? (
                    <div className="flex justify-center items-center mt-4">
                        <div className="loader">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                ) : !loading && gifs?.data?.length === 0 ? (
                    <p className="text-gray-400">{`No GIFs found for ${category} category.`}</p>
                ) : ""}
            </div>
        </div>
    )
};

export default Category;