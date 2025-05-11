import { createContext, useContext, useState } from "react";

export const GifContext = createContext();

const GifProvider = ({ children }) => {

    const [gifs, setGifs] = useState([]);
    const [filter, setFilter] = useState("gifs");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const gifApiKey = import.meta.env.VITE_GIPHY_KEY;

    return (
        <GifContext.Provider value={{ gifApiKey, gifs, setGifs, filter, setFilter, loading, setLoading, error }}>
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