import { useCallback, useEffect, useRef } from 'react';

interface UseSseProps {
  path: string;
  events?: string[];
}

export const useSse = <T>({ path, events = [] }: UseSseProps) => {
  const eventSourceRef = useRef<EventSource | null>(null);

  const disconnect = useCallback(() => {
    eventSourceRef.current?.close();
    eventSourceRef.current = null;
  }, []);

  const connect = useCallback(
    (onMessage?: (data: T) => void, onConnect?: () => void, onError?: () => void) => {
      disconnect();

      const normalizedPath = path.startsWith('/') ? path : `/${path}`;
      const proxyUrl = `/api/sse?path=${encodeURIComponent(normalizedPath)}`;
      const source = new EventSource(proxyUrl);
      eventSourceRef.current = source;

      source.addEventListener('open', () => {
        onConnect?.();
      });
      source.addEventListener('error', () => {
        onError?.();
      });
      const handleEvent = (event: MessageEvent<string>) => {
        try {
          onMessage?.(JSON.parse(event.data) as T);
        } catch {
          onMessage?.(event.data as T);
        }
      };

      source.addEventListener('message', handleEvent);
      for (const eventName of events) {
        source.addEventListener(eventName, handleEvent as EventListener);
      }
    },
    [disconnect, events, path],
  );

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    connect,
    disconnect,
  };
};
