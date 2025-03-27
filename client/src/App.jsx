import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import GoogleLogin from './GoogleLogin'
import HomePage from './HomePage'
import { GoogleOAuthProvider } from '@react-oauth/google'



function App() {

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId='436979933193-ee9jfgfhki15flbhb55hu2d62qlf6pju.apps.googleusercontent.com'>
        <GoogleLogin></GoogleLogin>
      </GoogleOAuthProvider>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
