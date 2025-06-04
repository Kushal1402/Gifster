import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Gifs from "../components/Gifs";
import { GifState } from "../context/gif-context";

function SearchPage() {
    const { query } = useParams();
    const { gifApiKey, gifApiBaseUrl, filter, updateGifs, loading, setLoading, loadingMore, setLoadingMore, offset, hasMore, resetPagination } = GifState();

    const fetchSearchResults = async (isLoadingMore = false) => {
        if (isLoadingMore) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }

        try {
            const response = await fetch(
                `${gifApiBaseUrl}${filter}/search?api_key=${gifApiKey}&q=${query}&limit=20&offset=${offset}&rating=r`
            );
            const data = await response.json();
            updateGifs(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // Handle initial load and query changes
    useEffect(() => {
        if (query) {
            resetPagination();
            fetchSearchResults();
        }
    }, [query]);

    // Function to load more gifs when scrolling
    const loadMoreGifs = () => {
        if (!loading && !loadingMore && hasMore && query) {
            fetchSearchResults(true);
        }
    };

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

            <Gifs
                loading={loading}
                loadMoreGifs={loadMoreGifs}
                hasMore={hasMore}
                loadingMore={loadingMore}
            />
        </div>
    );
}

export default SearchPage;