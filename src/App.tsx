import React from 'react';
import { LoginPage } from './pages/Auth/LoginPage';

import { createI18n } from './app/i18n';

createI18n();

function App() {
  return <LoginPage />;
}

export default App;
