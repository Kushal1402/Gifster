import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Gifs from "../components/Gifs";
import { GifState } from "../context/gif-context";

function SearchPage() {
    const { query } = useParams();
    const { gifApiKey, gifs, setGifs, loading, setLoading } = GifState();

    const fetchSearchResults = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.giphy.com/v1/gifs/search?api_key=${gifApiKey}&q=${query}&limit=20&rating=g`
            );
            const data = await response.json();
            setGifs(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query) {
            fetchSearchResults();
        }
    }, [query]);

    return (
        <div className="container mx-auto px-0 my-3">
            <div className="flex flex-row items-baseline gap-3 mb-6">
                <div className="w-auto">
                    <span className="text-gray-400 text-xl font-medium">
                        Showing results for:
                    </span>
                </div>
                <div>
                    <h2 className="text-xl pb-1 font-extrabold">
                        "{query}"
                    </h2>
                </div>
            </div>

            <Gifs gifs={gifs} loading={loading} />
        </div>
    );
}

export default SearchPage;