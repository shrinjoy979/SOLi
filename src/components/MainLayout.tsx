import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type MainLayoutProps = {
  children: ReactNode;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children, darkMode, setDarkMode }) => {
  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="min-h-[calc(100vh-120px)]">
          {children}
        </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
