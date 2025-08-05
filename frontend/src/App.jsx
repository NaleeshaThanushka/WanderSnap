// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
import Home from './component/Home/Home';
import Destination from './component/Destinations/Destination';
import SignIn from './component/Account/SignIn';
import SignUp from './component/Account/SignUp';
import Gallery from './component/Gallery/Gallery';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destination />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </>
  );
};

export default App;
