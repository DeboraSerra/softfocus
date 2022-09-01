import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SMain } from '../styles';

import Home from '../pages/Home';
import Register from '../pages/Register';
import Search from '../pages/Search';

const Content = () => {
  return (
    <SMain>
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/search" element={ <Search /> } />
      </Routes>
    </SMain>
  )
}

export default Content;
