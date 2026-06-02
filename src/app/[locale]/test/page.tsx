'use client';
import { useEffect, useState } from 'react';

export default function TestPage() {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      // setPreview(null) 제거 - 어차피 다음 effect에서 처리됨
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
      setPreview(null); // cleanup에서 null 처리
    };
  }, [file]);

  return <div>test</div>;
}
