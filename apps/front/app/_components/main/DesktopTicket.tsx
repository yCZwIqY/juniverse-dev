'use client';

import React, { useEffect, useRef, useState } from 'react';

const DesktopTicket = () => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const force = 20;
    const onMouseMove = (event: MouseEvent) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const x = event.clientX - width / 2;
      const y = event.clientY - height / 2;

      const rx = (x / width) * force;
      const ry = -(y / height) * force;

      // 마우스 위치를 상태로 저장 (글로스 효과용)
      setMousePos({
        x: (event.clientX / width) * 100,
        y: (event.clientY / height) * 100,
      });

      ticketRef.current?.style.setProperty('transform', `rotateY(${rx}deg) rotateX(${ry}deg)`);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="-rotate-3 relative flex justify-center items-center">
      <div
        ref={ticketRef}
        className="absolute transform-3d perspective-dramatic"
        style={{
          filter: 'drop-shadow(0 25px 30px rgba(0,0,0,0.25))',
        }}
      >
        <div className="relative">
          <svg
            className="w-[80dvw]"
            width="1557"
            viewBox="0 0 1557 612"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
            }}
          >
            {/* 기존 SVG path */}
            <path
              d="M1556.94 -6.10352e-05V36.6768H1557C1548.91 36.6768 1541.15 39.891 1535.43 45.6124C1529.71 51.3337 1526.49 59.0936 1526.49 67.1848C1526.49 75.2761 1529.71 83.0359 1535.43 88.7573C1541.15 94.4787 1548.91 97.693 1557 97.693V115.156C1548.91 115.156 1541.15 118.37 1535.43 124.091C1529.71 129.813 1526.49 137.573 1526.49 145.664C1526.49 153.755 1529.71 161.515 1535.43 167.236C1541.15 172.958 1548.91 176.172 1557 176.172V193.609C1548.91 193.609 1541.15 196.823 1535.43 202.544C1529.71 208.266 1526.49 216.026 1526.49 224.117C1526.49 232.208 1529.71 239.968 1535.43 245.689C1541.15 251.411 1548.91 254.625 1557 254.625V272.062C1548.91 272.062 1541.15 275.276 1535.43 280.998C1529.71 286.719 1526.49 294.479 1526.49 302.57C1526.49 310.661 1529.71 318.421 1535.43 324.143C1541.15 329.864 1548.91 333.078 1557 333.078V350.515C1548.91 350.515 1541.15 353.729 1535.43 359.451C1529.71 365.172 1526.49 372.932 1526.49 381.023C1526.49 389.115 1529.71 396.874 1535.43 402.596C1541.15 408.317 1548.91 411.531 1557 411.531V428.942C1548.91 428.942 1541.15 432.157 1535.43 437.878C1529.71 443.599 1526.49 451.359 1526.49 459.451C1526.49 467.542 1529.71 475.302 1535.43 481.023C1541.15 486.744 1548.91 489.959 1557 489.959V507.396C1548.91 507.396 1541.16 510.608 1535.44 516.327C1529.72 522.046 1526.5 529.803 1526.5 537.891C1526.5 545.979 1529.72 553.735 1535.44 559.454C1541.16 565.173 1548.91 568.386 1557 568.386V611.528H309.782H297.805H0L0 568.373C8.08784 568.373 15.8444 565.16 21.5634 559.441C27.2824 553.722 30.4952 545.966 30.4952 537.878C30.4952 529.79 27.2824 522.034 21.5634 516.315C15.8444 510.596 8.08784 507.383 0 507.383L0 489.946C8.09126 489.946 15.8511 486.732 21.5725 481.01C27.2939 475.289 30.5081 467.529 30.5081 459.438C30.5081 451.346 27.2939 443.587 21.5725 437.865C15.8511 432.144 8.09126 428.93 0 428.93L0 411.493C8.09126 411.493 15.8511 408.278 21.5725 402.557C27.2939 396.836 30.5081 389.076 30.5081 380.985C30.5081 372.893 27.2939 365.133 21.5725 359.412C15.8511 353.691 8.09126 350.476 0 350.476L0 333.04C8.09126 333.04 15.8511 329.825 21.5725 324.104C27.2939 318.382 30.5081 310.623 30.5081 302.531C30.5081 294.44 27.2939 286.68 21.5725 280.959C15.8511 275.238 8.09126 272.023 0 272.023L0 254.586C6.59166 254.592 13.0078 252.463 18.2873 248.516C23.5667 244.569 27.4252 239.018 29.2847 232.694C30.1278 229.904 30.5615 227.006 30.5725 224.091C30.5725 220.084 29.783 216.116 28.249 212.413C26.715 208.711 24.4666 205.347 21.6323 202.514C18.798 199.681 15.4333 197.434 11.7304 195.902C8.02752 194.369 4.05898 193.581 0.0515134 193.583L0.0515134 176.146C8.14277 176.146 15.9026 172.932 21.624 167.211C27.3454 161.489 30.5596 153.729 30.5596 145.638C30.5596 137.547 27.3454 129.787 21.624 124.066C15.9026 118.344 8.14277 115.13 0.0515134 115.13L0.0515134 97.693C8.14277 97.693 15.9026 94.4787 21.624 88.7573C27.3454 83.0359 30.5596 75.2761 30.5596 67.1848C30.5596 59.0936 27.3454 51.3337 21.624 45.6124C15.9026 39.891 8.14277 36.6768 0.0515134 36.6768L0.0515134 -6.10352e-05L297.741 -6.10352e-05L309.717 -6.10352e-05L1556.94 -6.10352e-05Z"
              fill="url(#paint0_linear_161_98)"
            />

            <rect
              x="0"
              y="0"
              width="1557"
              height="612"
              fill={`url(#glossGradient-${mousePos.x}-${mousePos.y})`}
              mask="url(#ticketMask)"
              style={{
                mixBlendMode: 'overlay',
              }}
            />

            {/* 동적 글로스 그라디언트 정의 */}
            <defs>
              <radialGradient
                id={`glossGradient-${mousePos.x}-${mousePos.y}`}
                cx={`${mousePos.x}%`}
                cy={`${mousePos.y}%`}
                r="60%"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="30%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="60%" stopColor="transparent" />
              </radialGradient>
            </defs>

            <text
              transform="translate(163.551 339.981)"
              fill="white"
              xmlSpace="preserve"
              className="whitespace-pre font-bold"
              style={{
                textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
              }}
            >
              <tspan x="0" y="14.4545">
                FLIGHT NO.
              </tspan>
            </text>

            <text
              transform="translate(163.551 373.464)"
              fill="white"
              xmlSpace="preserve"
              className="whitespace-pre text-xl font-medium"
              style={{
                textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
              }}
            >
              <tspan x="0" y="19.2727">
                JY605
              </tspan>
            </text>

            <text
              transform="translate(489.366 339.981)"
              fill="white"
              xmlSpace="preserve"
              className="whitespace-pre font-bold"
              style={{
                textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
              }}
            >
              <tspan x="0" y="14.4545">
                PASSENGER
              </tspan>
            </text>

            <text
              transform="translate(489.366 373.464)"
              fill="white"
              xmlSpace="preserve"
              className="whitespace-pre text-xl font-medium"
              style={{
                textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
              }}
            >
              <tspan x="0" y="19.2727">
                이지윤 (LEE JIYOON)
              </tspan>
            </text>

            <text
              transform="translate(815.181 339.981)"
              fill="white"
              xmlSpace="preserve"
              className="whitespace-pre font-bold"
              style={{
                textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
              }}
            >
              <tspan x="0" y="14.4545">
                GATE
              </tspan>
            </text>

            <text
              transform="translate(815.181 373.464)"
              fill="white"
              xmlSpace="preserve"
              className={'whitespace-pre text-xl font-medium'}
              style={{
                textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
              }}
            >
              <tspan x="0" y="14.4545">
                Here
              </tspan>
            </text>

            {/* 항공기 아이콘 */}
            <g clipPath="url(#clip0_161_98)">
              <path
                d="M645.835 226.42L624.8 226.256L624.734 226.375L603.03 263.595C602.518 264.37 601.831 265.014 601.024 265.473C600.217 265.933 599.313 266.196 598.385 266.241L593.113 266.2C592.743 266.226 592.373 266.158 592.036 266.003C591.699 265.847 591.407 265.61 591.187 265.312C590.966 265.014 590.824 264.665 590.774 264.298C590.724 263.93 590.767 263.556 590.9 263.21L599.888 232.922L599.946 226.062L581.818 225.921C579.853 225.794 577.915 225.398 576.058 224.744L571.357 233.39C570.87 234.174 570.199 234.828 569.402 235.296C568.606 235.764 567.708 236.03 566.785 236.073L565.17 236.065C564.351 236.056 563.569 235.723 562.995 235.139C562.42 234.556 562.099 233.768 562.103 232.949L562.173 223.384L562.183 223.209L562.231 215.968L562.232 215.784L562.311 206.228C562.321 205.409 562.653 204.627 563.237 204.052C563.821 203.477 564.608 203.157 565.427 203.16L567.046 203.173C567.967 203.232 568.86 203.515 569.647 203.997C570.435 204.478 571.093 205.144 571.566 205.936L576.141 214.645C578.009 214.021 579.953 213.656 581.919 213.558L600.047 213.7L600.091 206.844L591.577 176.42C591.45 176.071 591.412 175.697 591.468 175.33C591.524 174.964 591.671 174.617 591.896 174.323C592.122 174.028 592.417 173.795 592.756 173.645C593.095 173.495 593.467 173.433 593.836 173.465L599.109 173.506C600.035 173.566 600.935 173.843 601.735 174.315C602.534 174.788 603.212 175.442 603.712 176.224L624.832 213.778L624.896 213.898L645.931 214.062C649.345 214.08 658.06 216.922 658.043 220.336C658.007 223.75 649.249 226.447 645.835 226.42Z"
                fill="white"
                style={{
                  textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
                }}
              />
            </g>

            {/* 나머지 텍스트들 */}
            <text
              transform="translate(163.551 414.673)"
              fill="white"
              xmlSpace="preserve"
              className="whitespace-pre"
              fontSize="15"
              fontWeight="bold"
              style={{
                textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
              }}
            >
              <tspan x="0" y="14.4545">
                DATE
              </tspan>
            </text>

            <text
              transform="translate(489.366 414.673)"
              fill="white"
              xmlSpace="preserve"
              className="whitespace-pre"
              fontSize="15"
              fontWeight="bold"
              style={{
                textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
              }}
            >
              <tspan x="0" y="14.4545">
                BOARDING
              </tspan>
            </text>

            <text
              transform="translate(163.551 448.156)"
              fill="white"
              xmlSpace="preserve"
              className="whitespace-pre text-xl font-medium"
              style={{
                textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
              }}
            >
              <tspan x="0" y="19.2727">
                31, JUL, 2025
              </tspan>
            </text>

            <text
              transform="translate(489.366 448.156)"
              fill="white"
              xmlSpace="preserve"
              className="whitespace-pre text-xl font-medium"
              style={{
                textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
              }}
            >
              <tspan x="0" y="19.2727">
                Now
              </tspan>
            </text>

            <text
              transform="translate(815.181 414.673)"
              fill="white"
              xmlSpace="preserve"
              className="whitespace-pre font-bold"
              style={{
                textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
              }}
            >
              <tspan x="0" y="14.4545">
                DEPARTURE
              </tspan>
            </text>

            <text
              transform="translate(815.181 448.156)"
              fill="white"
              xmlSpace="preserve"
              className="whitespace-pre text-xl font-medium"
              style={{
                textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
              }}
            >
              <tspan x="0" y="19.2727">
                Undetermined
              </tspan>
            </text>

            {/* 점선 구분선 */}
            <path d="M1225.99 -6.10352e-05L1225.99 610.42" stroke="white" strokeWidth="2" strokeDasharray="8 8" />

            {/* 큰 타이틀 텍스트 */}
            <text
              transform="translate(78 63)"
              fill="white"
              xmlSpace="preserve"
              className="whitespace-pre text-[40px] font-medium translate-z-16"
              style={{
                textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
              }}
            >
              <tspan x="407.152" y="38.5455">
                WEB DEVELOPER
              </tspan>
            </text>

            {/* 우측 패널 */}
            <rect x="1225.99" y="43.7854" width="266.576" height="533.152" fill="white" />
            <rect x="73.3293" y="46.2854" width="1416.74" height="528.152" stroke="white" strokeWidth="5" />

            {/* 우측 패널 텍스트들 */}
            <text transform="translate(1274 161.5)" fill="#4DBBFF" xmlSpace="preserve" className="whitespace-pre text-2xl font-bold">
              <tspan x="0" y="23.2273">
                MENU
              </tspan>
            </text>

            <text
              transform="translate(1274 223.5)"
              fill="#91D5FF"
              xmlSpace="preserve"
              className={'whitespace-pre text-2xl font-medium  hover:text-shadow-xs hover:font-bold cursor-pointer '}
            >
              <tspan x="0" y="23.2273">
                <a href={'#about-me'}> ABOUT ME</a>
              </tspan>
            </text>

            <text
              transform="translate(1274 285.5)"
              fill="#91D5FF"
              xmlSpace="preserve"
              className={'whitespace-pre text-2xl font-medium hover:text-shadow-xs hover:font-bold cursor-pointer '}
            >
              <tspan x="0" y="23.2273">
                SKILL
              </tspan>
            </text>

            <text
              transform="translate(1274 347.5)"
              fill="#91D5FF"
              xmlSpace="preserve"
              className={'whitespace-pre text-2xl font-medium hover:text-shadow-xs hover:font-bold cursor-pointer '}
            >
              <tspan x="0" y="23.2273">
                PROJECT
              </tspan>
            </text>

            <text
              transform="translate(1274 409.5)"
              fill="#91D5FF"
              xmlSpace="preserve"
              className={'whitespace-pre text-2xl font-medium hover:text-shadow-xs hover:font-bold cursor-pointer '}
            >
              <tspan x="0" y="23.2273">
                BLOG
              </tspan>
            </text>

            {/* 하단 선들 */}
            <line
              x1="82.5562"
              y1="128.644"
              x2="1221.99"
              y2="128.644"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="square"
              strokeDasharray="11 11"
            />
            <line
              x1="82.5562"
              y1="533.015"
              x2="1221.99"
              y2="533.015"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="square"
              strokeDasharray="11 11"
            />

            <text
              transform="translate(236.956 175.142)"
              fill="white"
              xmlSpace="preserve"
              className={'whitespace-pre text-[64px] font-bold'}
              style={{
                textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
              }}
            >
              <tspan x="0" y="61.7727">
                WEB
              </tspan>
            </text>

            <text
              transform="translate(819.045 175.142)"
              fill="white"
              xmlSpace="preserve"
              className={'whitespace-pre text-[64px] font-bold'}
              style={{
                textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
              }}
            >
              <tspan x="0" y="38">
                JUNIVERS
              </tspan>
              <tspan x="90" y="88">
                DEV
              </tspan>
            </text>

            <defs>
              <filter
                id="filter0_d_161_98"
                x="0"
                y="-6.10352e-05"
                width="1607"
                height="661.528"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="12.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_161_98" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_161_98" result="shape" />
              </filter>
              <linearGradient id="paint0_linear_161_98" x1="191.771" y1="21" x2="1153.12" y2="656.532" gradientUnits="userSpaceOnUse">
                <stop stopColor="#69C6FF" />
                <stop offset="1" stopColor="#7BB4FF" />
              </linearGradient>
              <clipPath id="clip0_161_98">
                <rect width="123.629" height="123.629" fill="white" transform="translate(627.492 154.203) rotate(45.4469)" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DesktopTicket;
