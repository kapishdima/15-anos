import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import Micromodal from 'micromodal';
import { Button, Form, useClickOutside, useMediaQuery, useModal } from '@components/index';
import { useTranslation } from 'react-i18next';
import { FieldValues, UseFormReset } from 'react-hook-form';

import { CLOSE_CONFIRMATION_MODAL, CloseConfirmationModal } from './CloseConfirmationModal';
import { EventEmitter, Events } from '@/app/transport/event-bus';

type ModalProps = React.PropsWithChildren & {
  id: string;
  hasConfirmButton?: boolean;
  confirmButtonText?: string | null;
  cancelButtonText?: string | null;
  title?: string | null;
  minWidth?: string;
  minHeight?: string;
  loading?: boolean;
  initialValues?: any;
  onSubmit: (values: any, reset?: UseFormReset<FieldValues>) => void;
  validation?: any;
  actions?: JSX.Element | null;
};

export const Dialog: React.FC<ModalProps> = ({
  id,
  title,
  children,
  confirmButtonText,
  cancelButtonText,
  minHeight,
  minWidth,
  loading,
  initialValues,
  onSubmit,
  validation,
  actions,
  hasConfirmButton = true,
}) => {
  const closeConfirmationModalId = `${id}_${CLOSE_CONFIRMATION_MODAL}`;

  const { t } = useTranslation();
  const { open, close } = useModal();

  const modalRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [shouldCloseConfirmation, setShouldConfirmation] = useState(false);

  const handleClose = () => {
    if (shouldCloseConfirmation) {
      open(closeConfirmationModalId);
    } else {
      close(id);
    }
  };

  const onConfirmedClose = () => {
    close(closeConfirmationModalId);
    close(id);
    EventEmitter.dispatch(Events.CLOSE_MODAL);
  };

  const onCancelClose = () => {
    close(closeConfirmationModalId);
  };

  useClickOutside(modalRef, onConfirmedClose);

  useEffect(() => {
    Micromodal.init();
  }, []);

  useEffect(() => {
    EventEmitter.subscribe(Events.FORM_MODIFY, ({ isDirty }) => {
      setShouldConfirmation(isDirty);
    });
  }, []);

  return (
    <>
      {ReactDOM.createPortal(
        <div className="modal micromodal-slide" id={id} aria-hidden="true">
          <div className="modal__overlay" tabIndex={-1}>
            <div
              className="modal__container"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${id}-title`}
              style={{
                minHeight: !isMobile ? minHeight : '',
                minWidth: !isMobile ? minWidth : '',
              }}>
              <div className="">
                <header className="modal__header">
                  <h2 className="modal__title" id={`${id}-title`}>
                    {title}
                  </h2>
                  <button
                    className="modal__close"
                    aria-label="Close modal"
                    onClick={handleClose}></button>
                </header>
                <Form id={id} onSubmit={onSubmit} initialValues={initialValues} schema={validation}>
                  <main className="modal__content dialog__content" id={`${id}-content`}>
                    {children}
                  </main>
                  <footer className="modal__footer">
                    <Button onClick={handleClose} appearance="ghost" variant="error">
                      {cancelButtonText || t('Cancel')}
                    </Button>
                    {actions}
                    {hasConfirmButton && (
                      <Button
                        aria-label="Close this dialog window"
                        variant="success"
                        loading={loading}
                        type="submit">
                        {confirmButtonText || t('Confirm')}
                      </Button>
                    )}
                  </footer>
                </Form>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
      <CloseConfirmationModal
        id={id}
        onConfirmedClose={onConfirmedClose}
        onCancelClose={onCancelClose}
      />
    </>
  );
};
