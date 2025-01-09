import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
        <main>
          {children}
        </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
