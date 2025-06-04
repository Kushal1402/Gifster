import { useState, useEffect, useRef, createRef } from 'react';
import { HiMiniXMark, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { GifState } from '../context/gif-context';

const SearchPopup = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const inputRef = useRef(null);
    const popupRef = useRef(null);
    const suggestionRefs = useRef([]);

    const { gifApiBaseUrl, gifApiKey, filter, resetPagination } = GifState();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 100);
            setSelectedIndex(-1);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setQuery('');
                setSuggestions([]);
                setSelectedIndex(-1);
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (!suggestions.length) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prevIndex => {
                    const newIndex = prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0;
                    if (suggestionRefs.current[newIndex] && typeof suggestionRefs.current[newIndex].scrollIntoView === 'function') {
                        suggestionRefs.current[newIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                    }
                    return newIndex;
                });
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prevIndex => {
                    const newIndex = prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1;
                    if (suggestionRefs.current[newIndex] && typeof suggestionRefs.current[newIndex].scrollIntoView === 'function') {
                        suggestionRefs.current[newIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                    }
                    return newIndex;
                });
                break;
            case 'Enter':
                if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                    e.preventDefault();
                    handleSearch(suggestions[selectedIndex].name);
                }
                break;
            case 'Escape':
                onClose();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        setSelectedIndex(-1);
        suggestionRefs.current = suggestions.map(() => createRef());
    }, [suggestions]);

    useEffect(() => {
        // Fetch suggestions when query changes
        if (query.trim().length > 2) setLoading(true);

        const fetchSuggestions = async () => {
            if (query.trim().length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                const response = await fetch(`${gifApiBaseUrl}${filter}/search/tags?api_key=${gifApiKey}&q=${query}&limit=5`);
                const data = await response.json();
                setSuggestions(data.data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchSuggestions();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [query, gifApiKey]);

    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) return;
        navigate(`/search/${searchTerm}`);
        resetPagination();
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(query);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-start justify-center pt-20 animate-fadeIn">
            <div
                ref={popupRef}
                className="w-full max-w-2xl bg-gray-900 rounded-lg shadow-xl overflow-hidden animate-slideDown"
            >
                <form onSubmit={handleSubmit} className="relative">
                    <div className="flex items-center p-4 border-b border-gray-800">
                        <span className="text-gray-400 mr-2">
                            <HiOutlineMagnifyingGlass size={20} strokeWidth={2} />
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search for GIFs"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent text-white text-xl focus:outline-none py-2 placeholder-gray-500"
                        />
                        {query?.length > 0 && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                            >
                                <HiMiniXMark size={24} />
                            </button>
                        )}
                    </div>
                </form>

                <div className="max-h-80 overflow-y-auto">
                    {loading ? (
                        <div className="p-4 text-gray-400">
                            <div className="loader">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    ) : suggestions.length > 0 ? (
                        <ul>
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={suggestion.name}
                                    ref={(el) => suggestionRefs.current[index] = el}
                                    onClick={() => handleSearch(suggestion.name)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                    className={`px-6 py-3 cursor-pointer text-gray-200 transition-colors flex items-center ${selectedIndex === index ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
                                >
                                    <span className="text-gray-400 mr-3">
                                        <HiOutlineMagnifyingGlass size={16} strokeWidth={2} />
                                    </span>
                                    {suggestion.name}
                                </li>
                            ))}
                        </ul>
                    ) : (suggestions.length <= 0 && query.length > 0) ? (
                        <div className="p-6 text-gray-400 text-center">
                            No suggestions found for "{query}"
                        </div>
                    ) : (
                        <div className="p-6 text-gray-400 text-center">
                            Type to search for GIFs
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPopup;
