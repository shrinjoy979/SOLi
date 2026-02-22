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
        <main>
          {children}
        </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
