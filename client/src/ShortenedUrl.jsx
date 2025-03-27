const ShortenedUrl = ({ url }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(url.shortUrl);
        alert("Copied to clipboard!");
    };

    return (
        <div className="p-2 border-b flex justify-between items-center">
            <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">{url.shortUrl}</a>
            <button onClick={handleCopy} className="ml-2 p-1 bg-gray-200 rounded">Copy</button>
        </div>
    );
};

export default ShortenedUrl;