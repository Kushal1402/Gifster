import { useState, useEffect } from 'react';

import Gifs from "../components/Gifs";
import { GifState } from "../context/gif-context";

function Home() {

    const { gifApiKey, filter, gifs, setGifs, loading, setLoading } = GifState();

    const fetchTrendingGifs = async () => {
        const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${gifApiKey}&limit=20&type=${filter}&rating=g`);
        const data = await response.json();
        // console.log(data);
        setGifs(data);
        setLoading(false);
        return data;
    };

    useEffect(() => {
        fetchTrendingGifs();
    }, [filter]);

    return (
        <Gifs gifs={gifs} loading={loading} />
    );
}

export default Home;
