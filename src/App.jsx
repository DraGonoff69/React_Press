import './App.css';
import React from 'react'; // Remove the unused import of Component

import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/General" element={<News country="in" category="General" />} />
        <Route exact path="/" element={<News country="in" category="General" />} />

        <Route exact path="/Business" element={<News country="in" category="Business" />} />
        <Route exact path="/Entertainment" element={<News country="in" category="Entertainment" />} />
        {/* {/* <Route exact path="/Business" element={<News country="in" category="Business" />} /> */}
        <Route exact path="/Sports" element={<News country="in" category="Sports" />} />
        <Route exact path="/Technology" element={<News country="in" category="Technology" />} />
        <Route exact path="/Health" element={<News country="in" category="Health" />} />
        <Route exact path="/Science" element={<News country="in" category="Science" />} /> 
        <Route exact path="/Login" element={<Login/>} />
        <Route exact path="/SignUp" element={<SignUp/>} />
      </Routes>
    </Router>
  )
}

