
import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Chatbot from '../chatbot/Chatbot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        {children}
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Layout;
