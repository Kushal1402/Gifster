const Category = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-5 my-4">
            <div className="w-full sm:w-72">
                <span className="text-gray-400 text-sm pt-2">
                    Don&apos;t tell it to me, GIF it to me!
                </span>
                <div className="w-full h-0.5 mt-6 bg-gray-800" />
            </div>
            <div>
                <h2 className="text-4xl pb-1 font-extrabold capitalize">
                    Category GIFs
                </h2>
            </div>
        </div>
    )
};

export default Category;