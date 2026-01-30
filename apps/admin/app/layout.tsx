import React from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko" className="dark">
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  );
};

export default Layout;
