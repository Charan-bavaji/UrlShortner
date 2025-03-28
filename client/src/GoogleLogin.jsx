import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { googleAuth } from './api'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
const GoogleLogin = () => {
    const navigate = useNavigate();
    const response = async (authResult) => {
        try {
            if (authResult['code']) {
                const result = await googleAuth(authResult['code']);
                const { email, name, image } = result.data.user;
                const token = result.data.token;
                const obj = { email, name, image, token };
                localStorage.setItem('user-info', JSON.stringify(obj));
                navigate('/home');
            }
        } catch (error) {
            console.error('Error while req google code', error);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: response,
        onError: response,
        flow: 'auth-code'
    })

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-100 flex-col gap-10">
            <h1 className='text-2xl font-semibold'>URL Shortner</h1>
            <button
                onClick={googleLogin}
                className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-md border border-gray-300 hover:shadow-lg hover:bg-gray-50 transition"
            >
                <FcGoogle size={22} />
                <span className="font-medium text-sm">Login with Google</span>
            </button>
        </div>
    );
}

export default GoogleLogin;
