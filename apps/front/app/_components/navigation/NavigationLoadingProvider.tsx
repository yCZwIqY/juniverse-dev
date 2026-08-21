'use client';

import React, { Suspense, createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface NavigationLoadingContextValue {
  isNavigating: boolean;
  startNavigation: () => void;
  stopNavigation: () => void;
}

const NavigationLoadingContext = createContext<NavigationLoadingContextValue | null>(null);

const NavigationStateSync = ({ onRouteChange }: { onRouteChange: () => void }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    onRouteChange();
  }, [onRouteChange, pathname, searchParams]);

  return null;
};

export const NavigationLoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const startNavigation = useCallback(() => {
    setIsNavigating(true);
  }, []);

  const stopNavigation = useCallback(() => {
    setIsNavigating(false);
  }, []);

  useEffect(() => {
    if (!isNavigating) return;
    const timer = setTimeout(() => setIsNavigating(false), 10000);
    return () => clearTimeout(timer);
  }, [isNavigating]);

  const value = useMemo(
    () => ({
      isNavigating,
      startNavigation,
      stopNavigation,
    }),
    [isNavigating, startNavigation, stopNavigation],
  );

  return (
    <NavigationLoadingContext.Provider value={value}>
      <Suspense fallback={null}>
        <NavigationStateSync onRouteChange={stopNavigation} />
      </Suspense>
      {/* Top progress bar — only navigation indicator outside <main> */}
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] overflow-hidden pointer-events-none bg-[var(--color-hairline-soft)]">
          <div className="absolute h-full w-[40%] bg-[var(--color-primary)] [animation:nav-scan_1s_ease-in-out_infinite]" />
        </div>
      )}
      {children}
    </NavigationLoadingContext.Provider>
  );
};

export const useNavigationLoading = () => {
  const context = useContext(NavigationLoadingContext);
  if (!context) {
    throw new Error('useNavigationLoading must be used within NavigationLoadingProvider');
  }
  return context;
};
