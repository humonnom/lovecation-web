/**
 * 전역 Z-index 레이어 관리
 *
 * 앱 전체에서 최상단에 위치해야 하는 요소들만 관리
 * 컴포넌트 내부의 로컬 z-index는 각 컴포넌트에서 직접 관리
 */
export const Z_INDEX = {
  /** 헤더 (고정 상단 네비게이션) */
  HEADER: 'z-50',

  /** 하단 네비게이션 */
  BOTTOM_NAV: 'z-50',

  /** 모달 */
  MODAL: 'z-[100]',

  /** 토스트/알림 */
  TOAST: 'z-[200]',
} as const;