import React from 'react';
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  makeStyles,
  tokens
} from '@fluentui/react-components';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  closeOnOverlayClick?: boolean;
}

const useStyles = makeStyles({
  surface: {
    maxWidth: '90vw',
    maxHeight: '90vh',
  },
  small: {
    width: '400px',
  },
  medium: {
    width: '600px',
  },
  large: {
    width: '800px',
  },
  body: {
    overflowY: 'auto',
  },
  actions: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    justifyContent: 'flex-end',
  },
});

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  size = 'medium',
  closeOnOverlayClick = true,
}) => {
  const styles = useStyles();
  
  const sizeClass = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  }[size];

  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open) {
          onClose();
        }
      }}
    >
      <DialogSurface
        className={`${styles.surface} ${sizeClass}`}
        onClick={closeOnOverlayClick ? undefined : (e) => e.stopPropagation()}
      >
        {title && (
          <DialogTitle>{title}</DialogTitle>
        )}
        <DialogBody className={styles.body}>
          {children}
        </DialogBody>
        {actions && (
          <DialogActions className={styles.actions}>
            {actions}
          </DialogActions>
        )}
      </DialogSurface>
    </Dialog>
  );
};

export default Modal;