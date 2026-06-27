export interface AlertModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  buttonText?: string;
}

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
}
