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
      {children}
      {isNavigating ? (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col gap-2 items-center justify-center bg-black/20">
          <svg
            className={'animate-spin'}
            width={'64px'}
            height={'64px'}
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
            fill="var(--color-foreground)"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g fill="none" fillRule="evenodd">
                <circle cx="7" cy="7" r="6" stroke="var(--color-foreground)" strokeOpacity=".1" strokeWidth="2"></circle>
                <path fill="var(--color-foreground)" fillOpacity=".1" fillRule="nonzero" d="M7 0a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5V0z"></path>
              </g>
            </g>
          </svg>
        </div>
      ) : null}
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
