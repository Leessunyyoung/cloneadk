import React, { useEffect } from 'react';
import './App.css';
import { login } from './api/auth';
import KeywordCheck from './components/KeywordCheck';

function App() {
  useEffect(() => {
    login();
  });
  return <>
  <KeywordCheck/>
  </>;
}

export default App;
