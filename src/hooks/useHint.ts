import { useState, useEffect } from 'react';

interface UseHintOptions {
  condition: boolean;
  delay?: number;
  dismissCondition?: boolean;
}

export function useHint({ condition, delay = 1000, dismissCondition }: UseHintOptions) {
  const [showHint, setShowHint] = useState(false);

  // 조건이 맞으면 delay 후 힌트 표시
  useEffect(() => {
    if (condition) {
      const timer = setTimeout(() => {
        setShowHint(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShowHint(false);
    }
  }, [condition, delay]);

  // dismissCondition이 true가 되면 힌트 숨기기
  useEffect(() => {
    if (dismissCondition) {
      setShowHint(false);
    }
  }, [dismissCondition]);

  return {
    showHint,
    hideHint: () => setShowHint(false),
  };
}
