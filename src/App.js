import './App.css';
import React, { useState } from 'react';
import Login from './components/Login';
import HomePage from './components/HomePage';

import Dashboard from './components/Dashboard';
function App(){
    return(
      <>
      <HomePage/>
      {/* <Routes> */}
        {/* <Switch> */}
          {/* <Route path="/" component={Login}/> */}
          {/* <Route path="/HomePage" component={HomePage}/> */}
        {/* </Switch> */}
      {/* </Routes> */}
      </>
    );
}
export default App;
