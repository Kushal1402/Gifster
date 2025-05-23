import { createContext, useContext, useState } from "react";

export const GifContext = createContext();

const GifProvider = ({ children }) => {
    const [gifs, setGifs] = useState({ data: [] });
    const [filter, setFilter] = useState("gifs");
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const gifApiKey = import.meta.env.VITE_GIPHY_KEY;
    const gifApiBaseUrl = "https://api.giphy.com/v1/";

    // Reset pagination when filter or search changes
    const resetPagination = () => {
        setOffset(0);
        setHasMore(true);
        setGifs({ data: [] });
    };

    // Update gifs with new data
    const updateGifs = (newData) => {
        if (!newData || !newData.data || newData.data.length === 0) {
            setHasMore(false);
            return;
        }

        setGifs(prevGifs => {
            if (offset === 0) {
                return newData;
            }

            return {
                ...newData,
                data: [...prevGifs.data, ...newData.data]
            };
        });

        setOffset(prev => prev + newData.data.length);

        if (!newData.pagination || newData.pagination.count < newData.pagination.limit) {
            setHasMore(false);
        }
    };

    return (
        <GifContext.Provider value={{ gifApiKey, gifApiBaseUrl, gifs, setGifs, updateGifs, filter, setFilter, loading, setLoading, loadingMore, setLoadingMore, error, setError, offset, setOffset, hasMore, setHasMore, resetPagination }}>
            {children}
        </GifContext.Provider>
    );
}

export const GifState = () => {
    const context = useContext(GifContext);

    if (context === undefined) {
        throw new Error("useGifState must be used within a GifProvider");
    }

    return context;
};

export default GifProvider;