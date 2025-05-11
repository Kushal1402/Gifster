// import mock_gifs from '../utils/mock-data';
import { Link } from "react-router-dom";

const Gifs = ({ gifs, loading }) => {

    return (
        <>
            {!loading && gifs?.data?.length > 0 ?
                <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-5">
                    {gifs?.data.map((gif) => (
                        <Link to={`${gif.type}/${gif.slug}`} key={gif?.id} className="block mb-2">
                            <div className="w-full mb-2 relative bg-png-pattern cursor-pointer group">
                                <img
                                    src={gif?.images?.fixed_width.webp}
                                    alt={gif?.title}
                                    className="w-full object-cover rounded transition-all duration-300 transparent-bg-stickers-text"
                                    loading="lazy"
                                    decoding="async"
                                />
                                {gif?.user?.display_name && (
                                    <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-transparent via-transparent to-black font-bold flex items-end gap-2 p-2">
                                        <img
                                            src={gif?.user?.avatar_url}
                                            alt={gif?.user?.display_name}
                                            className="h-8"
                                        />
                                        <span>{gif?.user?.display_name}</span>
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
                : loading ? (
                    <div class="loader">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-screen">
                        <h2 className="text-2xl font-bold">No Gifs Found</h2>
                    </div>
                )
            }
        </>
    )
};

export default Gifs;