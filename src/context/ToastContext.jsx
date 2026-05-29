import { createContext, useContext, useState, useCallback } from 'react';
import { HiCheckCircle, HiExclamation, HiInformationCircle, HiXCircle, HiX } from 'react-icons/hi';

const ToastContext = createContext(null);

const typeConfig = {
  success: { icon: HiCheckCircle, bg: 'bg-nature-50', border: 'border-nature-200', text: 'text-nature-800', iconColor: 'text-nature-500' },
  error: { icon: HiXCircle, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', iconColor: 'text-red-500' },
  warning: { icon: HiExclamation, bg: 'bg-warm-50', border: 'border-warm-200', text: 'text-warm-800', iconColor: 'text-warm-500' },
  info: { icon: HiInformationCircle, bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-800', iconColor: 'text-sky-500' },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2.5 max-w-sm" aria-live="polite">
        {toasts.map(toast => {
          const config = typeConfig[toast.type] || typeConfig.success;
          const Icon = config.icon;
          return (
            <div
              key={toast.id}
              className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg shadow-gray-200/50 animate-slide-up ${config.bg} ${config.border}`}
              role="alert"
            >
              <Icon className={`flex-shrink-0 mt-0.5 ${config.iconColor}`} size={20} />
              <p className={`text-sm font-medium flex-1 ${config.text}`}>{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 p-0.5 rounded hover:bg-black/5 transition-colors"
                aria-label="Dismiss notification"
              >
                <HiX size={14} className="text-gray-400" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
