import { useEffect, useState, lazy } from "react";
import { useParams, Link } from "react-router-dom";

import { GifState } from "../context/gif-context";
const EmbedGifPopup = lazy(() => import("../components/embed-gif"));

import { HiOutlineExternalLink } from "react-icons/hi";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";
import { FaLink } from "react-icons/fa";

// Theme colors for ghost loader items
const themeColors = ['#00CCFF', '#9733FF', '#FFF35C', '#FF6666', '#00FF99'];
const contentType = ["gifs", "stickers", "texts"];

const GifPage = () => {

    const { type, slug } = useParams();

    const { gifApiKey, gifApiBaseUrl, filter } = GifState();

    const [gifData, setGifData] = useState({});
    const [readMore, setReadMore] = useState(false);

    const [embedPopup, setEmbedPopup] = useState(false);
    const [embedData, setEmbedData] = useState({
        gifEmbedUrl: "",
        gifPageUrl: "",
        gifTitle: "GIF"
    });

    const [relatedGif, setRelatedGifs] = useState([]);
    const [relatedLoading, setRelatedLoading] = useState(true);

    const [copyText, setCopyText] = useState(false);

    useEffect(() => {
        if (!contentType.includes(type)) {
            throw new Error("Invalid Content Type");
        };

        const fetchGif = async () => {
            try {
                const slug_id = slug.split("-");

                const response = await fetch(`${gifApiBaseUrl}${filter}/${slug_id[slug_id.length - 1]}?api_key=${gifApiKey}`);
                const data = await response.json();
                setGifData(data.data);

                const relatedGifs = await fetch(`${gifApiBaseUrl}${filter}/related?gif_id=${slug_id[slug_id.length - 1]}&rating=pg-13&limit=20&type=${filter}&api_key=${gifApiKey}`);
                const relatedData = await relatedGifs.json();
                setRelatedGifs(relatedData.data);
                setRelatedLoading(false);

            } catch (error) {
                console.error("Error fetching search results:", error);
                setRelatedLoading(false);
            } finally {
                setRelatedLoading(false);
            }
        };

        fetchGif();


        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [type, slug, filter]);

    const shareGif = (e) => {
        e.preventDefault();

        let title = gifData?.title;
        let url = gifData?.url || gifData?.images?.original?.webp;
        let separator = ' ';

        const isMobileOrTablet = () => {
            return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
        };
        const objectToGetParams = (params) => '?' + Object.entries(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

        const whatsappBase = isMobileOrTablet() ? 'https://api.whatsapp.com/send' : 'https://web.whatsapp.com/send';

        const shareUrl = whatsappBase + objectToGetParams({ text: `${title}${separator}${url}` });

        if (isMobileOrTablet()) {
            window.open(shareUrl, '_blank');
        } else {
            window.open(
                shareUrl,
                '_blank',
                'width=550,height=400,noopener,noreferrer'
            );
        }
    };

    const EmbedGif = (e) => {
        e.preventDefault();

        setEmbedData({
            gifEmbedUrl: gifData?.embed_url,
            gifPageUrl: gifData?.url,
            gifTitle: gifData?.title || "GIF"
        });
        setEmbedPopup(true);
    };

    return (
        <>
            <div className="grid grid-cols-4 my-10 gap-4">
                <div className="hidden sm:block">
                    {gifData?.user && (
                        <>
                            <div className="flex gap-1">
                                <img
                                    src={gifData?.user?.avatar_url}
                                    alt={gifData?.user?.display_name}
                                    className="h-14"
                                />
                                <div className="px-2">
                                    <div className="font-bold">{gifData?.user?.display_name}</div>
                                    <div className="faded-text">@{gifData?.user?.username}</div>
                                </div>
                            </div>
                            {gifData?.user?.description && (
                                <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                                    {gifData?.user?.description?.length > 119 && readMore ? gifData?.user?.description : gifData?.user?.description.slice(0, 119) + "..."}

                                    <div className="flex items-center faded-text cursor-pointer" onClick={() => setReadMore(!readMore)}>
                                        {gifData?.user?.description?.length < 119 ? (
                                            ""
                                        ) : readMore ? (
                                            <>
                                                Read less <HiMiniChevronUp size={20} />
                                            </>
                                        ) : (
                                            <>
                                                Read more <HiMiniChevronDown size={20} />
                                            </>
                                        )}
                                    </div>
                                </p>
                            )}

                            <div className="w-full h-0.5 bg-gray-800 mt-1 mb-3" />
                        </>
                    )}


                    {gifData?.user?.website_url && (
                        <div>
                            <span className="faded-text">
                                Source
                            </span>
                            <div className="flex items-center text-sm font-bold gap-1">
                                <HiOutlineExternalLink size={25} />
                                <a href={gifData?.user?.website_url} target="_blank" className="truncate">
                                    {gifData?.source}
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-span-4 sm:col-span-3">
                    <div className="flex gap-6">
                        <div className="w-full sm:w-3/4">
                            <div className="faded-text truncate mb-2">{gifData?.title}</div>

                            <div className="relative">
                                <img
                                    src={gifData?.images?.original?.webp}
                                    srcSet={`
                                        ${gifData?.images?.fixed_width_small?.webp} 100w,
                                        ${gifData?.images?.fixed_width?.webp} 200w,
                                        ${gifData?.images?.original?.webp} 480w,
                                    `}
                                    alt={gifData?.alt_text ? gifData?.alt_text : gifData?.title}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className={`w-full object-cover rounded transition-all duration-300 ${gifData?.type === "text" || gifData?.type === "sticker" ? "transparent-bg-stickers-text" : ""}`}
                                    decoding="async"
                                    width={gifData?.images?.original.width}
                                    height={gifData?.images?.original.height}
                                    loading="eager"
                                />
                            </div>

                            {/* -- Mobile UI -- */}
                            <div className="flex sm:hidden gap-1 mt-3">
                                <img
                                    src={gifData?.user?.avatar_url}
                                    alt={gifData?.user?.display_name}
                                    className="h-14"
                                />
                                <div className="px-2">
                                    <div className="font-bold">{gifData?.user?.display_name}</div>
                                    <div className="faded-text">@{gifData?.user?.username}</div>
                                </div>

                                <button className="ml-auto" onClick={(e) => shareGif(e)}>
                                    <FaPaperPlane size={20} />
                                </button>
                                <button className="ms-1 me-1" onClick={(e) => EmbedGif(e)}>
                                    <IoCodeSharp size={25} />
                                </button>
                                <button className="me-1" onClick={() => navigator.clipboard.writeText(gifData?.images?.original?.url)}>
                                    <FaLink size={20} />
                                </button>
                            </div>
                        </div>

                        {(gifData && gifData !== null && gifData !== undefined) && (
                            <div className="hidden sm:flex flex-col gap-5 mt-6">
                                <div className="group">
                                    <button
                                        onClick={(e) => shareGif(e)}
                                        className="flex gap-6 items-center font-bold cursor-pointer text-lg group-hover:scale-110 transition-transform"
                                    >
                                        <FaPaperPlane size={25} />
                                        Share on WhatsApp
                                    </button>
                                </div>
                                <div className="group">
                                    <button
                                        onClick={(e) => EmbedGif(e)}
                                        className="flex gap-5 items-center font-bold cursor-pointer text-lg group-hover:scale-110 transition-transform"
                                    >
                                        <IoCodeSharp size={30} />
                                        Embed
                                    </button>
                                </div>
                                <div className="group">
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(gifData?.images?.original?.url);
                                            setCopyText(true);
                                            setTimeout(() => {
                                                setCopyText(false);
                                            }, 2000);
                                        }}
                                        className="flex gap-5 items-center font-bold cursor-pointer text-lg group-hover:scale-110 transition-transform"
                                    >
                                        <FaLink size={25} />
                                        {copyText ? "Copied!" : "Copy Link"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* Not Found || Error */}
                {(!gifData || gifData === null || gifData === undefined) && (
                    <div className="col-span-4 text-center">
                        <h2 className="text-2xl font-bold">Gif Not Found</h2>
                        <p className="text-gray-400">The requested gif does not exist or has been removed.</p>
                    </div>
                )}

                {/* Embed Popup */}
                {embedPopup && (
                    <EmbedGifPopup
                        onClose={() => setEmbedPopup(false)}
                        gifTitle={embedData?.gifTitle}
                        gifEmbedUrl={embedData?.gifEmbedUrl}
                        gifPageUrl={embedData?.gifPageUrl}
                    />
                )}
            </div>

            {/* Related Gifs */}
            <div className="w-full">
                {relatedGif?.length > 0 && !relatedLoading ? (
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold mb-4">Related GIFs</h2>

                        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
                            {relatedGif.map((gif, idx) => (
                                <Link to={`/${gif?.type}s/${gif?.slug}`} key={gif?.id} className="block mb-2">
                                    <div key={idx} className="mb-4 relative bg-png-pattern cursor-pointer group">
                                        <img
                                            src={gif?.images.fixed_width.webp}
                                            srcSet={`
                                                ${gif?.images.fixed_width_small.webp} 100w,
                                                ${gif?.images.fixed_width.webp} 200w,
                                                ${gif?.images.original.webp} 480w,
                                            `}
                                            alt={gif?.alt_text ? gif?.alt_text : gif?.title}
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className={`w-full object-cover rounded transition-all duration-300 ${gif?.type === "text" || gif?.type === "sticker" ? "transparent-bg-stickers-text" : ""}`}
                                            decoding="async"
                                            width={gif?.images.original.width}
                                            height={gif?.images.original.height}
                                            loading="lazy"
                                            style={{
                                                background: gif?.type !== "text" && gif?.type !== "sticker" ? themeColors[idx % themeColors.length] : ""
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
                            ))}
                        </div>
                    </div>
                ) : relatedLoading ? (
                    <div className="flex justify-center items-center mt-4">
                        <div className="loader">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                ) : !relatedLoading && relatedGif?.length < 1 ? (
                    <p className="text-gray-400">No related GIFs found.</p>
                ) : ""}
            </div>
        </>
    );
}

export default GifPage;