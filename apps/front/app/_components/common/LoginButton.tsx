'use client';

const LoginButton = () => {
  const handleGoogleLogin = (type: 'google' | 'github') => {
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/auth/${type}`, '_blank');
  };
  return (
    <div>
      <button onClick={() => handleGoogleLogin('google')}>구글 로그인</button>
      <button onClick={() => handleGoogleLogin('github')}>깃허브 로그인</button>
    </div>
  );
};

export default LoginButton;
