import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CustomCursor />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main>
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Contact />
            </main>
            <Footer />
          </div>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;