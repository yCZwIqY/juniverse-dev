'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const OAuthCallBackPage = () => {
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      localStorage.setItem('access_token', token as string);
      window.close();
    }
  }, [params]);

  return <p>로그인 중...</p>;
};

export default OAuthCallBackPage;
