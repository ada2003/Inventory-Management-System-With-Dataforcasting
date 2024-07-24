

import React from 'react';
import './dashboard.css'; // Import your CSS file for styling
import Sidebar from '../compo/Sidebar';
import MainContent from '../compo/MainContent';

function Dashbord() {
  return (
    <div className="app">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default Dashbord;
