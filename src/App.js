import React, { useState } from 'react' 
import './App.css' 
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom' 
import Navbar from './components/Navbar' 
import LoginPage from './pages/Login' 
import EventsPage from './pages/Events' 
import BookingsPage from './pages/Bookings' 
import SignUpPage from './pages/SignUp' 
import AuthContext from './context/auth-context'
import PrivateRoute from './components/PrivateRoute' 

function App() {
  let [token, setToken] = useState(localStorage.getItem('token') || '') 
  let [userId, setUserId] = useState(localStorage.getItem('userId') || '') 
  let [username, setUsername] = useState(localStorage.getItem('username') || '') 

  const login = (userToken, loginUserId, username) => {
    setToken(userToken) 
    setUserId(loginUserId) 
    setUsername(username)
    if(userToken) localStorage.setItem(["token"], userToken) 
    if(loginUserId) localStorage.setItem("userId", loginUserId) 
    if(username) localStorage.setItem("username", username) 
  } 

  const logout = () => {
    setToken(null) 
    setUserId(null) 
    setUsername(null)
    localStorage.clear() 
  } 

  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider value={{ token, userId, username, login, logout }}>
          <Navbar />
          <main className="main-content">
          <Routes>
            {!token && <Route path='/login' element={<LoginPage />} />}
            <Route path="/" element={<Navigate replace to="/events" />} exact />
          
            <Route path='/events' element={<EventsPage />} />
            <Route path='/signup' element={<SignUpPage />} />

            <Route path='/bookings' element={
              <PrivateRoute>
                <BookingsPage />
              </PrivateRoute>
            } />

            <Route path='/login' element={
              <PrivateRoute path='login'>
                <EventsPage />
              </PrivateRoute>
            } />

            <Route path='/signup' element={
              <PrivateRoute path='signup'>
                <EventsPage />
              </PrivateRoute>
            } />

          </Routes>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  ) 
}

export default App 