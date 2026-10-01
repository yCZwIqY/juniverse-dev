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
      { src: '/android-icon-36x36.png', sizes: '36x36', type: 'image/png' },
      { src: '/android-icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { src: '/android-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { src: '/android-icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { src: '/android-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { src: '/android-icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
    ],
    screenshots: [
      {
        src: '/pwa-install-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: '관리자 대시보드 데스크톱 화면',
      },
      {
        src: '/pwa-install-mobile.png',
        sizes: '720x1280',
        type: 'image/png',
        label: '관리자 대시보드 모바일 화면',
      },
    ],
  };
}
