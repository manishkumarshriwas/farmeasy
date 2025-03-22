import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './Components/Home';
import Navbar from './Components/Navbar';
import FAQSection from './Components/FAQ';
import Contact from './Components/Contact';
import About from './Components/About';
import Services from './Components/Services';
import Blog from './Components/Blog';
import BlogPage from './Components/BlogPage';
import Blog1 from './Components/Blog1';
import Blog2 from './Components/Blog2';
import Blog3 from './Components/Blog3';
import Dashboard from './Components/Dashboard';
import Dashboard1 from './Components/Dashboard1';
import Signup from './Components/Signup';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';

const App = () => {
  const [user, setUser] = useState(null); // Define the user state

  // Fetch user data on mount
  useEffect(() => {
    axios
      .get('http://localhost:5000/users') // Replace with your actual API endpoint
      .then((response) => {
        console.log('Fetched users:', response.data.users);
        // You can update state with fetched user data if needed
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <Router>
        {/* Pass the user and setUser props to Navbar */}
        <Navbar user={user} setUser={setUser} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/FAQSection" element={<FAQSection />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/blogs/page/:pagenumber" element={<Blog1 />} />
          <Route path="/blogs/page/2" element={<Blog2 />} />
          <Route path="/blogs/page/3" element={<Blog3 />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Dashboard1" element={<Dashboard1 />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login setUser={setUser} />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/BlogPage" element={<BlogPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
