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
        <main style={{ padding: '1rem' }}>
          {children}
        </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
