"use client";

import { useEffect } from "react";

const toastTypeStyles = {
  success: "bg-green-600/80 backdrop-blur-sm text-white",
  error: "bg-red-600/80 backdrop-blur-sm text-white",
  warning: "bg-yellow-500/80 backdrop-blur-sm text-white",
  info: "bg-blue-600/80 backdrop-blur-sm text-white",
};

export default function Toast({ title, message, type = "info", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  const typeClasses = toastTypeStyles[type] || toastTypeStyles.info;

  return (
    <div className="fixed top-16 right-1 z-[120] flex flex-col gap-3">
      <div
        className={`w-full max-w-xs md:max-w-sm rounded px-5 py-2 md:px-6 md:py-2 transition-all duration-300 ${typeClasses}`}
      >
        {title ? (
          <p className="text-sm font-semibold mb-1 tracking-wide uppercase">
            {title}
          </p>
        ) : null}
        <p className="text-sm md:text-base leading-relaxed">{message}</p>
      </div>
    </div>
  );
}

