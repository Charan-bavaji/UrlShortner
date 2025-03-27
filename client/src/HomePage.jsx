import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ShortenForm from './ShortenForm';
import ShortenedUrl from './ShortenedUrl';
const HomePage = () => {

    // Authentication
    const navigate = useNavigate();
    const [userInfom, setUserInfo] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem('user-info');
        const userData = JSON.parse(data);
        setUserInfo(userData);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user-info');
        navigate('/login');
    }

    // URL Shortner
    const [shortenedUrls, setShortenedUrls] = useState([]);
    const handleShorten = async (newUrl) => {

        setShortenedUrls([...shortenedUrls, newUrl]);
    };
    return (
        <div>
            <h1>Welcome {userInfom?.name}</h1>
            <div>
                <ShortenForm onShorten={handleShorten} />
                <ul className="mt-4">
                    {shortenedUrls.map((url, index) => (
                        <ShortenedUrl key={index} url={url} />
                    ))}
                </ul>
            </div>
            <button onClick={handleLogout}>LogOut</button>
        </div>
    )
}

export default HomePage
