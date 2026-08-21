import React from 'react';
import ClientShell from '@/app/(protected)/_components/ClientShell';
import 'components/src/tiptap/styles/_variables.scss';
import 'components/src/tiptap/styles/_keyframe-animations.scss';


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
