// import mock_gifs from '../utils/mock-data';
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { GifState } from "../context/gif-context";

// Theme colors for ghost loader items
const themeColors = [
    '#00CCFF',
    '#9733FF',
    '#FFF35C',
    '#FF6666',
    '#00FF99'
];

const Gifs = ({ loading, loadMoreGifs, hasMore, loadingMore }) => {
    const { gifs } = GifState();
    const ghostItems = Array(10).fill({ isGhost: true });

    const mergedItems = loadingMore ? [...gifs?.data, ...ghostItems] : gifs?.data || [];

    // Initial loading state
    if (loading && (!gifs?.data || gifs.data.length === 0)) {
        return (
            <div className="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }

    // No results state
    if (!loading && (!gifs?.data || gifs.data.length === 0)) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-2xl font-bold">No Gifs Found</h2>
            </div>
        );
    }

    return (
        <InfiniteScroll
            dataLength={gifs?.data?.length || 0}
            next={loadMoreGifs}
            hasMore={hasMore}
            loader={null}
            scrollThreshold={0.8}
            className="mt-5"
        >
            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
                {mergedItems.map((gif, index) => {

                    if (gif.isGhost) {
                        return (
                            <div
                                key={`ghost-${index}`}
                                className="w-full mb-2 relative rounded"
                                style={{
                                    height: `250px`,
                                    background: `${themeColors[index % themeColors.length]}`
                                }}
                            />
                        );
                    }

                    return (
                        <Link to={`${gif.type}/${gif.slug}`} key={gif?.id} className="block mb-2">
                            <div className="w-full mb-2 relative bg-png-pattern cursor-pointer group">
                                <img
                                    src={gif?.images?.fixed_width.webp}
                                    srcSet={`
                                    ${gif?.images?.fixed_width_small?.webp} 100w,
                                    ${gif?.images?.fixed_width?.webp} 200w,
                                    ${gif?.images?.original?.webp} 480w,
                                `}
                                    alt={gif?.alt_text ? gif?.alt_text : gif?.title}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className={`w-full object-cover rounded transition-all duration-300 ${gif.type === "text" || gif.type === "sticker" ? "transparent-bg-stickers-text" : ""}`}
                                    decoding="async"
                                    width={gif?.images?.original.width}
                                    height={gif?.images?.original.height}
                                    fetchPriority={index < 4 ? "high" : "auto"}
                                    loading={index < 8 ? "eager" : "lazy"}
                                    style={{
                                        background: gif.type !== "text" && gif.type !== "sticker" ? themeColors[index % themeColors.length] : ""
                                    }}
                                />
                                {gif?.user?.display_name && (
                                    <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-transparent via-transparent to-black font-bold flex items-end gap-2 p-2 z-10">
                                        <img
                                            src={gif?.user?.avatar_url}
                                            alt={gif?.user?.display_name}
                                            className="h-8 object-cover rounded-full"
                                            width="32"
                                            height="32"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <span>{gif?.user?.display_name}</span>
                                    </div>
                                )}
                            </div>
                        </Link>
                    )}
                )}
            </div>
        </InfiniteScroll>
    );
};

export default Gifs;