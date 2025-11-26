import { toast } from 'sonner';

export interface ErrorHandlerOptions {
  showToast?: boolean;
  logToSentry?: boolean;
  toastMessage?: string;
  context?: Record<string, unknown>;
}

/**
 * 전역 에러 핸들러
 * 에러를 토스트로 표시하고 Sentry에 기록합니다.
 */
export const handleError = (
  error: Error | unknown,
  options: ErrorHandlerOptions = {}
) => {
  const {
    showToast = true,
    // logToSentry = true,
    toastMessage,
    context = {},
  } = options;

  // 에러 메시지 추출
  const errorMessage = error instanceof Error ? error.message : String(error);
  const displayMessage = toastMessage || errorMessage || '알 수 없는 오류가 발생했습니다.';

  // 토스트 표시
  if (showToast) {
    toast.error(displayMessage, {
      duration: 4000,
    });
  }

  // 개발 환경에서는 콘솔에도 출력
  if (process.env.NODE_ENV === 'development') {
    console.error('Error handled:', error);
    if (Object.keys(context).length > 0) {
      console.error('Context:', context);
    }
  }

  // TODO: Sentry 통합 시 추가
  // if (logToSentry) {
  //   Sentry.captureException(error, { contexts: { custom: context } });
  // }
};

/**
 * React Query용 에러 핸들러
 */
export const handleQueryError = (error: Error | unknown) => {
  handleError(error, {
    context: {
      type: 'react-query',
    },
  });
};

/**
 * 네트워크 에러 핸들러
 */
export const handleNetworkError = (error: Error | unknown) => {
  handleError(error, {
    toastMessage: '네트워크 연결을 확인해주세요.',
    context: {
      type: 'network',
    },
  });
};

/**
 * 인증 에러 핸들러
 */
export const handleAuthError = (error: Error | unknown) => {
  handleError(error, {
    toastMessage: '인증에 실패했습니다. 다시 로그인해주세요.',
    context: {
      type: 'authentication',
    },
  });
};
