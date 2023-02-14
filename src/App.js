import logo from './logo.svg';
import './App.css';
import MainHeader from './UI/MainHeader';
import {
  Routes,
  Route,
} from "react-router-dom";
import React, { useEffect } from 'react';

import HomePage from './UI/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import MyAccount from './pages/MyAccount';
import { testAuth } from './store/auth-action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import About from './pages/About';
import Fitness from './pages/Fitness/Fitness';
import Calorie from './pages/Calorie/Calorie';

function App() {
  const isLoggedIn = useSelector(state => state.sLogin.isAuthenticated)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(testAuth(true))
  },[isLoggedIn])

  const giris = isLoggedIn ? <MyAccount/> : <LoginPage/>
  const kalori = isLoggedIn ? <Calorie/> : <LoginPage/>
  const fitness = isLoggedIn ? <Fitness/> : <LoginPage/>

  return (
    <div className="App">
      <MainHeader />
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="about" element={<About/>}/>

      <Route path="login" element={<LoginPage/>} />
      <Route path="signup" element={<SignupPage/>} />

      <Route path="account" element={giris}/>
      <Route path="kalori" element={kalori}/>
      <Route path="fitness" element={fitness}/>
      </Routes>
    </div>
  );
}

export default App;
