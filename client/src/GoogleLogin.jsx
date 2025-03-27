import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { googleAuth } from './api'
import { useNavigate } from 'react-router-dom'
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
        <div>
            <button
                onClick={googleLogin}
            >Login with Google</button>
        </div>
    )
}

export default GoogleLogin;
