import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/style.css'
import MessagePage from './pages/MessagePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { AppProvider } from './api/AppContext';

function App() {
  return (
    <>
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/chat" element={<MessagePage/>} />
          <Route path="/registration" element={<RegisterPage/>} />
        </Routes>
      </Router>
    </AppProvider>
    </>
  )
}

export default App
