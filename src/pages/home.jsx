import { useState, useEffect } from 'react';

import Gifs from "../components/Gifs";
import { GifState } from "../context/gif-context";
import FilterGifs from '../components/filter-gifs';

function Home() {
    const { gifApiKey, filter, gifs, setGifs, loading, setLoading } = GifState();

    const fetchTrendingGifs = async () => {
        const response = await fetch(`https://api.giphy.com/v1/${filter}/trending?api_key=${gifApiKey}&limit=20&rating=g`);
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
        <>
            <FilterGifs showTrendingIcon={true} />

            <Gifs gifs={gifs} loading={loading} />
        </>
    );
}

export default Home;
