import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { AuthContextProvider, AuthGuard } from './components/auth';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';
import ELearningHome from './pages/ELearningHome';
import Courses from './pages/Courses';
import MyProfile from './pages/MyProfile';
import ComponentShowcase from './pages/ComponentShowcase';
import './App.css';

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <AuthContextProvider>
        <Router>
          <div className="App">
            <AuthGuard requireAuth={false}>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<ELearningHome />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route 
                    path="/my-profile" 
                    element={
                      <AuthGuard>
                        <MyProfile />
                      </AuthGuard>
                    } 
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route 
                    path="/components" 
                    element={
                      <AuthGuard>
                        <ComponentShowcase />
                      </AuthGuard>
                    } 
                  />
                </Routes>
              </main>
              <Footer />
            </AuthGuard>
          </div>
        </Router>
      </AuthContextProvider>
    </FluentProvider>
  );
}

export default App;
