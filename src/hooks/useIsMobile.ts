import { useEffect, useState } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // 1. User Agent 확인 (모바일/태블릿 디바이스)
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        'android',
        'webos',
        'iphone',
        'ipad',
        'ipod',
        'blackberry',
        'windows phone',
        'mobile',
      ];
      const isMobileUA = mobileKeywords.some((keyword) => userAgent.includes(keyword));

      // 2. 터치 이벤트 지원 여부
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // User Agent에서 모바일로 감지되거나, 터치가 지원되고 maxTouchPoints가 1 이상이면 모바일
      return isMobileUA || (hasTouchScreen && navigator.maxTouchPoints > 0);
    };

    setIsMobile(checkMobile());
  }, []);

  return isMobile;
}
