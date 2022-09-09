import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';

function allRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default allRoutes;
