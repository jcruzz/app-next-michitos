"use client";

import Alert from '@/app/components/alert/Alert';
import React, { ReactNode, createContext, useEffect, useState } from 'react';

type AlertType = 'Success' | 'Error' | 'Warning';

type Alert = {
  type: AlertType;
  message: string;
};

type AlertContext = {
  showAlert: (type: AlertType, message: string) => void;
};

type AlertContextProvider = {
  children: ReactNode;
};

export const AlertContext = createContext<AlertContext>({
  showAlert: () => {},
});

export const AlertProvider: React.FC<AlertContextProvider> = ({ children }) => {
  const [alertMessages, setAlertMessages] = useState<Alert[]>([]);

  const hideAlert = (index: number) => {
    setAlertMessages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAlertMessages((prevItems) => {
        if (prevItems.length > 0) {
          return prevItems.slice(1);
        }
        clearInterval(interval);
        return prevItems;
      });
    }, 8 * 1000);
    return () => clearInterval(interval);
  }, []);

  const contextValue: AlertContext = {
    showAlert: (type, message) => {
      const alertMessage: Alert = {
        type,
        message,
      };
      setAlertMessages((prev) => [...prev, alertMessage]);
    },
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {alertMessages.map((alert, index) => (
        <Alert
          message={alert.message}
          type={alert.type}
          key={index}
          onClose={() => hideAlert(index)}
        />
      ))}
      {children}
    </AlertContext.Provider>
  );
};
