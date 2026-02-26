'use client';

import { ReactNode, useEffect, useState } from 'react';
import Sidebar from '@/app/(protected)/_components/Sidebar';
import { useSse } from '@/hooks/use-sse';

type CommentAlarmPayload = {
  postId: number;
  postTitle: string;
  comment: string;
  createdAt: string;
};

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const ClientShell = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pushSupported, setPushSupported] = useState(false);
  const [pushSubscribed, setPushSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { connect } = useSse<CommentAlarmPayload>({
    path: '/api/notifications/stream',
    events: ['comment.alarm'],
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const supported = 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
    setPushSupported(supported);
    if (!supported) return;

    void navigator.serviceWorker.ready.then(async (registration) => {
      const existingSubscription = await registration.pushManager.getSubscription();
      setPushSubscribed(Boolean(existingSubscription));
    }).catch(() => {
      setPushSubscribed(false);
    });
  }, []);

  const onEnablePush = async () => {
    if (!pushSupported || isSubscribing) return;
    setIsSubscribing(true);

    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;

      const keyResponse = await fetch('/api/push/public-key', { cache: 'no-store' });
      if (!keyResponse.ok) return;
      const keyData = await keyResponse.json() as { publicKey?: string };
      if (!keyData.publicKey) return;

      const registration = await navigator.serviceWorker.ready;
      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(keyData.publicKey),
        });
      }

      const subscribeResponse = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });

      if (subscribeResponse.ok) {
        setPushSubscribed(true);
      }
    } finally {
      setIsSubscribing(false);
    }
  };

  useEffect(() => {
    connect(
      (data) => {
        if (!('Notification' in window) || Notification.permission !== 'granted') return;
        if (pushSubscribed) return;
        const notification = new Notification(`${data.postTitle} 새 댓글 알림`, {
          body: `${data.comment} (${new Date(data.createdAt).toLocaleDateString('ko-kr', {
            hour: '2-digit',
            minute: '2-digit',
          })})`,
        });
        notification.onclick = () => {
          window.focus();
          notification.close();
        };
      },
    );
  }, [connect, pushSubscribed]);

  return (
    <div className='flex flex-col md:flex-row min-h-dvh h-full overflow-y-scroll'>
      <div className='md:hidden flex items-center justify-between px-4 py-3'>
        <div className='text-sm font-semibold text-gray-100'>Admin</div>
        <div className='flex gap-2'>
          {pushSupported && !pushSubscribed ? (
            <button
              type='button'
              onClick={onEnablePush}
              className='px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 text-gray-100 hover:bg-white/20'
              disabled={isSubscribing}
            >
              {isSubscribing ? '설정 중' : '알림 켜기'}
            </button>
          ) : null}
          <button
            type='button'
            onClick={() => setIsOpen((prev) => !prev)}
            className='px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 text-gray-100 hover:bg-white/20'
          >
            메뉴
          </button>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-40 md:hidden ${isOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!isOpen}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-[280px] transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <Sidebar />
        </div>
      </div>
      <aside className='hidden md:block md:sticky md:top-0 md:h-dvh'>
        <Sidebar />
      </aside>
      <main className='flex-1 p-4 md:p-10 md:max-h-dvh md:overflow-y-auto'>{children}</main>
    </div>
  );
};

export default ClientShell;
