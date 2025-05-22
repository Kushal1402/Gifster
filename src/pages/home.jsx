import { useEffect } from 'react';

import Gifs from "../components/Gifs";
import { GifState } from "../context/gif-context";
import FilterGifs from '../components/filter-gifs';

function Home() {
    const { gifApiKey, gifApiBaseUrl, filter, updateGifs, loading, setLoading, loadingMore, setLoadingMore, offset, hasMore, resetPagination } = GifState();

    const fetchTrendingGifs = async (isLoadingMore = false) => {
        if (isLoadingMore) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }

        try {
            const response = await fetch(
                `${gifApiBaseUrl}${filter}/trending?api_key=${gifApiKey}&limit=20&offset=${offset}&rating=g`
            );
            const data = await response.json();
            updateGifs(data);
        } catch (error) {
            console.error("Error fetching trending gifs:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        resetPagination();
        fetchTrendingGifs();
    }, [filter]);

    const loadMoreGifs = () => {
        if (!loading && !loadingMore && hasMore) {
            fetchTrendingGifs(true);
        }
    };

    return (
        <>
            <FilterGifs showTrendingIcon={true} />

            <Gifs
                loading={loading}
                loadMoreGifs={loadMoreGifs}
                hasMore={hasMore}
                loadingMore={loadingMore}
            />
        </>
    );
}

export default Home;
