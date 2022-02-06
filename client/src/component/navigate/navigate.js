import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MapPin from '../map/mappin';

const Navigate = () => {
  return (
    <Routes>
      <Route path="/" element={<MapPin />} />
    </Routes>
  );
};

export default Navigate;
