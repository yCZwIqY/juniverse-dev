import React from 'react';
import ClientShell from '@/app/(protected)/_components/ClientShell';
import '../../styles/_variables.scss';
import '../../styles/_keyframe-animations.scss';


const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ClientShell>{children}</ClientShell>
  );
};

export default Layout;
