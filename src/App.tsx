import React from 'react';
import { useSetup } from './app/hooks/useSetup';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';

function App() {
  useSetup();

  return <RouterProvider router={router} />;
}

export default App;
