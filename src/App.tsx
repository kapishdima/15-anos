import React from 'react';
import { LoginPage } from './modules/auth/pages/LoginPage';
import { useSetup } from './app/hooks/useSetup';

function App() {
  useSetup();

  return <LoginPage />;
}

export default App;
