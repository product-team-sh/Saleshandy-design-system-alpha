'use client';

import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Toast, type ToastProps } from './Toast';

interface ToastItem extends ToastProps {
  id: string;
}

interface ToastContextValue {
  addToast: (toast: Omit<ToastProps, 'onDismiss'>) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const addToast = useCallback(
    (toast: Omit<ToastProps, 'onDismiss'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const item: ToastItem = { ...toast, id };
      setToasts((prev) => [...prev, item]);

      if (toast.type !== 'loading') {
        const timer = setTimeout(() => {
          dismissToast(id);
        }, 5000);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ addToast, dismissToast }}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            action={toast.action}
            onDismiss={() => dismissToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
