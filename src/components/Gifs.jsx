import mock_gifs from '../utils/mock-data';

const Gifs = () => {

    return (
        <div className="bg-gray-950 text-white min-h-screen">
            <div className="container px-6 py-4 mx-auto">
                <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
                    {mock_gifs?.data.map((gif) => (
                        <div className="w-full aspect-video mb-2 relative bg-png-pattern cursor-pointer group">
                            <img
                                src={gif?.images?.fixed_width.webp}
                                alt={gif?.title}
                                className="w-full object-cover rounded transition-all duration-300"
                            />
                            <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-transparent via-transparent to-black font-bold flex items-end gap-2 p-2">
                                <img
                                    src={gif?.user?.avatar_url}
                                    alt={gif?.user?.display_name}
                                    className="h-8"
                                />
                                <span>{gif?.user?.display_name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Gifs;