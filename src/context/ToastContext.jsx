import { createContext, useContext, useState, useCallback } from 'react';
import { HiCheck, HiExclamation, HiInformationCircle, HiX } from 'react-icons/hi';

const ToastContext = createContext(null);

const typeConfig = {
  success: { icon: HiCheck, bg: 'bg-gray-900', text: 'text-white' },
  error: { icon: HiExclamation, bg: 'bg-red-600', text: 'text-white' },
  warning: { icon: HiExclamation, bg: 'bg-warm-600', text: 'text-white' },
  info: { icon: HiInformationCircle, bg: 'bg-sky-600', text: 'text-white' },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-5 z-[100] flex flex-col gap-2 items-center sm:items-end" aria-live="polite">
        {toasts.map(toast => {
          const config = typeConfig[toast.type] || typeConfig.success;
          const Icon = config.icon;
          return (
            <div
              key={toast.id}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-[12px] shadow-lg min-w-[200px] max-w-[340px] animate-slide-up ${config.bg}`}
              role="alert"
            >
              <Icon className={`flex-shrink-0 ${config.text} opacity-80`} size={16} />
              <p className={`text-[13px] font-medium flex-1 ${config.text}`}>{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 p-0.5 rounded opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Dismiss"
              >
                <HiX size={14} className={config.text} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
