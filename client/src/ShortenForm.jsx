import React, { useState } from 'react';

const ShortenForm = ({ onShorten }) => {
    const [longUrl, setLongUrl] = useState("");
    const [customAlias, setCustomAlias] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (customAlias.trim() === "") {
            alert("Custom Alias is required!");
            return;
        }

        try {
            const response = await fetch("https://urlshortner-backend-tlbj.onrender.com/api/shorten", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ longUrl, customAlias }),
            });
            const data = await response.json();
            onShorten(data);
        } catch (error) {
            alert("Something went wrong while shortening the URL.");
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-lg shadow">
            <input
                type="text"
                placeholder="Enter long URL"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="p-2 border rounded"
            />
            <input
                type="text"
                placeholder="Custom alias"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                className="p-2 border rounded"
                required
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Shorten URL</button>
        </form>
    );
};

export default ShortenForm;
