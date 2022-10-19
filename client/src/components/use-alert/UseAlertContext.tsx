/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useRef, useState } from 'react';
import AlertDialog from '../dialog/AlertDialog';
import ConfirmDialog from '../dialog/ConfirmDialog';

interface ConfirmDialogConfig {
  dialogTitle: string;
  dialogMessage?: string;
  confirmAction?: () => void;
  cancelAction?: () => void;
}

interface AlertDialogConfig {
  dialogTitle: string;
  dialogMessage?: string;
  confirmAction?: () => void;
}

interface ConfirmConfig {
  title: string;
  message?: string;
}

interface AlertContextProps {
  confirm: (props: ConfirmConfig) => Promise<boolean>;
  alert: (props: ConfirmConfig) => Promise<void>;
}
const AlertContext = createContext<AlertContextProps>({
  confirm: async () => false,
  alert: async () => {},
});

export const useAlertDialog = () => useContext(AlertContext);

const AlertProvider: React.FC = ({ children }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [confirmDialogConfig, setConfirmDialogConfig] =
    useState<ConfirmDialogConfig>({
      dialogTitle: '',
      dialogMessage: '',
      cancelAction: undefined,
      confirmAction: undefined,
    });
  const [alertDialogConfig, setAlertDialogConfig] = useState<AlertDialogConfig>(
    {
      dialogTitle: '',
      dialogMessage: '',
      confirmAction: undefined,
    },
  );
  const alert = (config: ConfirmConfig): Promise<void> =>
    new Promise((resolve) => {
      const handleConfirm = () => {
        setShowAlertDialog(false);
        resolve();
      };

      setShowAlertDialog(true);
      setAlertDialogConfig({
        dialogTitle: config.title,
        dialogMessage: config.message,
        confirmAction: handleConfirm,
      });
    });
  const confirm = (config: ConfirmConfig): Promise<boolean> =>
    new Promise((resolve) => {
      setShowConfirmDialog(true);
      const handleConfirm = () => {
        setShowConfirmDialog(false);
        resolve(true);
      };
      const handleCancel = () => {
        setShowConfirmDialog(false);
        resolve(false);
      };

      setConfirmDialogConfig({
        dialogTitle: config.title,
        dialogMessage: config.message,
        cancelAction: handleCancel,
        confirmAction: handleConfirm,
      });
    });

  const contextValue = useRef({ confirm, alert });

  return (
    <AlertContext.Provider value={contextValue.current}>
      <ConfirmDialog
        open={showConfirmDialog}
        dialogTitle={confirmDialogConfig.dialogTitle}
        dialogMessage={confirmDialogConfig.dialogMessage}
        confirmAction={confirmDialogConfig.confirmAction}
        cancelAction={confirmDialogConfig.cancelAction}
      />
      <AlertDialog
        open={showAlertDialog}
        dialogTitle={alertDialogConfig.dialogTitle}
        dialogMessage={alertDialogConfig.dialogMessage}
        confirmAction={alertDialogConfig.confirmAction}
      />
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
