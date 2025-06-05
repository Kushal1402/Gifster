import { useState, useEffect } from 'react';

const EmbedGifPopup = ({ gifEmbedUrl, gifPageUrl, gifTitle = "GIF", onClose }) => {

    const [isResponsive, setIsResponsive] = useState(true);
    const [embedCode, setEmbedCode] = useState('');
    const [copied, setCopied] = useState(false);

    const nonResponsiveWidth = 480;
    const nonResponsiveHeight = 360;
    const responsiveAspectRatioPadding = '75%';

    useEffect(() => {
        if (!gifEmbedUrl) {
            setEmbedCode('');
            return;
        }

        let code = '';
        if (isResponsive) {
            code = `<div style='width:100%;height:0;padding-bottom:${responsiveAspectRatioPadding};position:relative;'><iframe src='${gifEmbedUrl}' width='100%' height='100%' frameBorder='0' allowFullScreen title='${gifTitle}'></iframe></div><p><a href="${gifPageUrl}">via GIPHY</a></p>`;
        } else {
            code = `<iframe src='${gifEmbedUrl}' width='${nonResponsiveWidth}' height='${nonResponsiveHeight}' frameBorder='0' allowFullScreen class="giphy-embed" title='${gifTitle}'></iframe><p><a href="${gifPageUrl}">via GIPHY</a></p>`;
        }

        setEmbedCode(code);
    }, [isResponsive, gifEmbedUrl, gifPageUrl, gifTitle, responsiveAspectRatioPadding]);

    const handleCopyCode = () => {
        if (!embedCode) return;
        navigator.clipboard.writeText(embedCode).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy embed code: ', err);
        });
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ease-in-out">
            <div className="bg-gray-800 text-white rounded-lg shadow-2xl p-6 w-full max-w-md transform transition-all duration-300 ease-in-out scale-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Embed this GIF</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-3xl leading-none cursor-pointer"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>

                <p className="text-gray-300 mb-4 text-sm">
                    Want to embed this GIF on your website or blog? Just drop in the embed code below and you're done!
                </p>

                <div className="flex items-center mb-5">
                    <span className="mr-3 text-gray-200 font-medium">Responsive:</span>
                    <div className="flex">
                        <button
                            onClick={() => setIsResponsive(true)}
                            className={`px-4 py-2 text-sm font-semibold rounded-l-md transition-colors duration-150 cursor-pointer ${
                                isResponsive ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            On
                        </button>
                        <button
                            onClick={() => setIsResponsive(false)}
                            className={`px-4 py-2 text-sm font-semibold rounded-r-md transition-colors duration-150 cursor-pointer ${
                                !isResponsive ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            Off
                        </button>
                    </div>
                </div>

                <div className="mb-5">
                    <textarea
                        readOnly
                        value={embedCode}
                        className="w-full h-32 p-3 border border-gray-600 rounded-md resize-none text-xs bg-gray-900 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        aria-label="Embed Code"
                        placeholder="Embed code will appear here..."
                    />
                </div>

                <button
                    onClick={handleCopyCode}
                    disabled={!embedCode}
                    className={`w-full font-semibold py-3 px-4 rounded-md transition-colors duration-150 text-white cursor-pointer ${
                        !embedCode ? 'bg-gray-500 cursor-not-allowed' : (copied ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700')
                    }`}
                >
                    {copied ? 'Copied!' : 'Copy Code'}
                </button>
            </div>
        </div>
    );
};

export default EmbedGifPopup;