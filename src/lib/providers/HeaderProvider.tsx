'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface HeaderContextType {
  title: string;
  subtitle: string;
  setHeader: (title: string, subtitle?: string) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState('Lovecation');
  const [subtitle, setSubtitle] = useState('');

  const setHeader = useCallback((newTitle: string, newSubtitle: string = '') => {
    setTitle(newTitle);
    setSubtitle(newSubtitle);
  }, []);

  return (
    <HeaderContext.Provider value={{ title, subtitle, setHeader }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}
