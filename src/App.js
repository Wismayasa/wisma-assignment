import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from './login';
import ListUser from './user/ListUser';
import Edit from './user/Edit';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route exact path="/user/ListUser" element={<ListUser/>} />
      <Route exact path="/user/Edit/:id" element={<Edit/>} />
    </Routes>
  );
}

export default App;
