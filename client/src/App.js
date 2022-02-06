import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navigate from './component/navigate/navigate';

const App = () => {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Navigate />
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
