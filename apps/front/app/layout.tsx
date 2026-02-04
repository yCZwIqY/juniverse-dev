import React from 'react';
import './global.css';

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko" className="dark">
      <body className={`font-Suit antialiased bg-background`}>{children}</body>
    </html>
  );
};

export default MainLayout;
