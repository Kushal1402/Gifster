import { useState, useEffect, useCallback } from 'react';

const ScrollToTop = () => {

    const [visible, setVisible] = useState(false);

    const top = 20;

    const handleScroll = useCallback(() => {
        const currentScrollTop = document.documentElement.scrollTop;

        if (currentScrollTop >= top) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [top]);

    useEffect(() => {
        handleScroll();

        document.addEventListener("scroll", handleScroll, { passive: true });

        return () => document.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const UpArrowIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="163.19 160.691 191.9752 256" fill={"currentColor"} width={"20"} height={"20"} >
            <path d="M 353.316 252.166 L 263.716 162.566 C 261.216 160.066 257.165 160.066 254.665 162.566 L 165.065 252.166 C 162.565 254.666 162.565 258.717 165.065 261.217 C 167.565 263.717 171.809 263.717 174.309 261.217 L 248.903 204.637 L 253.178 410.291 C 253.178 413.826 255.644 416.691 259.178 416.691 C 262.712 416.691 265.178 413.826 265.178 410.291 L 267.826 204.004 L 344.059 261.217 C 345.309 262.467 347.051 263.092 348.688 263.092 C 350.325 263.092 352.014 262.467 353.264 261.217 C 355.764 258.716 355.816 254.666 353.316 252.166 Z" style={{strokeWidth: "1" }}/>
        </svg>
    );

    const baseButtonClasses = "fixed bottom-0 right-0 pt-2 pl-2 w-13 h-12 shadow-lg text-white rounded-tl-[50px] z-50 transition-all duration-300 ease-in-out flex items-center justify-center cursor-pointer";
    const visibleStateClasses = "opacity-100 transform scale-100 translate-y-0";
    const hiddenStateClasses = "opacity-0 transform scale-95 translate-y-4 pointer-events-none";

    return (
        <>
            <button
                onClick={handleClick}
                className={`animated-btn ${baseButtonClasses} ${visible ? visibleStateClasses : hiddenStateClasses}`}
                aria-label="Scroll to top"
            >
                <UpArrowIcon />
            </button>
        </>
    );

};

export default ScrollToTop;