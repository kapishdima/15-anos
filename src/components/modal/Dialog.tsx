import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import Micromodal from 'micromodal';
import { Button, Form } from '@components/index';
import { useTranslation } from 'react-i18next';

type ModalProps = React.PropsWithChildren & {
  id: string;
  confirmButtonText?: string | null;
  cancelButtonText?: string | null;
  title?: string | null;
  minWidth?: string;
  minHeight?: string;
  loading?: boolean;
  initialValues?: any;
  onSubmit: (values: any) => void;
  validation?: any;
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
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    Micromodal.init();
  }, []);

  return ReactDOM.createPortal(
    <div className="modal micromodal-slide" id={id} aria-hidden="true">
      <div className="modal__overlay" tabIndex={-1} data-micromodal-close>
        <div
          className="modal__container"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${id}-title`}
          style={{ minHeight, minWidth }}>
          <div className="">
            <header className="modal__header">
              <h2 className="modal__title" id={`${id}-title`}>
                {title}
              </h2>
              <button
                className="modal__close"
                aria-label="Close modal"
                data-micromodal-close></button>
            </header>
            <Form onSubmit={onSubmit} initialValues={initialValues} schema={validation}>
              <main className="modal__content dialog__content" id={`${id}-content`}>
                {children}
              </main>
              <footer className="modal__footer">
                <Button data-micromodal-close appearance="ghost" variant="error">
                  {cancelButtonText || t('Cancel')}
                </Button>
                <Button
                  aria-label="Close this dialog window"
                  variant="success"
                  loading={loading}
                  type="submit">
                  {confirmButtonText || t('Confirm')}
                </Button>
              </footer>
            </Form>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
