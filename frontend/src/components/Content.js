import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SMain } from '../styles';

import Home from '../pages/Home';

const Content = () => {
  return (
    <SMain>
      <Routes>
        <Route path="/" element={ <Home /> } />
      </Routes>
    </SMain>
  )
}

export default Content;
