import { useState, useEffect, useRef } from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import SearchPopup from './search-popup';

const SearchGifs = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const searchBoxRef = useRef(null);

    // Handle keyboard shortcut (Ctrl+K or Cmd+K) to open search popup
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                openSearchPopup();
            }
            
            // Close popup with Escape key
            if (e.key === 'Escape' && isPopupOpen) {
                setIsPopupOpen(false);
            }
        };
        
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isPopupOpen]);

    const openSearchPopup = () => {
        setIsPopupOpen(true);
    };

    return (
        <>
            <div className="flex relative" ref={searchBoxRef}>
                <div 
                    onClick={openSearchPopup}
                    className="flex items-center w-full ps-7 pe-6 py-2 text-gray-300 bg-gray-800 rounded-lg h-10 border border-gray-700 cursor-pointer transition-colors"
                >
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                        <HiOutlineMagnifyingGlass size={16} stroke='#74787c' strokeWidth={3} />
                    </span>
                    <span className="text-gray-400 md:w-40 sm:w-32 w-26">
                        <>
                            <span className="block sm:hidden">Search</span>
                            <span className="hidden sm:block">Search Gifs</span>
                        </>
                    </span>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 text-gray-300 text-xs font-medium px-2 py-0.5 rounded ml-2">
                        {navigator.platform.includes('Mac') ? '⌘K' : 'Ctrl+K'}
                    </div>
                </div>
            </div>
            
            {/* Search Popup */}
            <SearchPopup 
                isOpen={isPopupOpen} 
                onClose={() => setIsPopupOpen(false)}
            />
        </>
    );
}

export default SearchGifs;