import React from 'react';
import { Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Outlet /> {/* This will render the appropriate page based on the route */}
    </>
  );
}

export default App;
