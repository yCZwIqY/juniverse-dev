export default function manifest() {
  return {
    name: 'Juniverse Dev: 관리자',
    short_name: '관리자 사이트',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/images/logo.png',
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/logo.png',
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/images/pwa-install-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: '관리자 대시보드 데스크톱 화면',
      },
      {
        src: '/images/pwa-install-mobile.png',
        sizes: '720x1280',
        type: 'image/png',
        label: '관리자 대시보드 모바일 화면',
      },
    ],
  };
}
