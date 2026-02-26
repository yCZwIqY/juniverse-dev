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
        'src': '/images/logo.png',
        'sizes': '192x192',
        'type': 'image/png',
        'purpose': 'any maskable',
      },
    ],
  };
}