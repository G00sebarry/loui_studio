import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Calculator from './components/Calculator';
import Portfolio from './components/Portfolio';
import Workflow from './components/Workflow';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-loui-bg min-h-screen text-loui-black selection:bg-loui-blue selection:text-white">
      <Header />
      <main className="flex flex-col gap-0">
        <Hero />
        <Features />
        <Calculator />
        <Portfolio />
        <Workflow />
      </main>
      <Footer />
    </div>
  );
};

export default App;