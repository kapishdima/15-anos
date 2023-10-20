import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import Micromodal from "micromodal";
import { Button } from "@components/index";
import { useTranslation } from "react-i18next";

type ModalProps = React.PropsWithChildren & {
  id: string;
  confirmButtonText?: string | null;
  cancelButtonText?: string | null;
  confirmButtonColor?: any;
  cancelButtonColor?: any;
  title?: string | null;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  loading?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  hasFooter?: boolean;
  hasCloseIconButton?: boolean;
  description?: string;
};

export const Modal: React.FC<ModalProps> = ({
  id,
  title,
  description,
  children,
  confirmButtonText,
  cancelButtonText,
  confirmButtonColor,
  cancelButtonColor,
  minHeight,
  minWidth,
  maxWidth,
  loading,
  onCancel,
  onConfirm,
  hasFooter = true,
  hasCloseIconButton = true,
}) => {
  const { t } = useTranslation();

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!onCancel) {
      return;
    }
    onCancel();
  };

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
          style={{ minHeight, minWidth, maxWidth }}
        >
          <div className="">
            <header className="modal__header">
              <div className="modal__header-text">
                {title && (
                  <h2 className="modal__title" id={`${id}-title`}>
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="modal__description">{description}</p>
                )}
              </div>
              {hasCloseIconButton && (
                <button
                  className="modal__close"
                  aria-label="Close modal"
                  onClick={handleCancel}
                ></button>
              )}
            </header>
            {children && (
              <main className="modal__content" id={`${id}-content`}>
                {children}
              </main>
            )}
            {hasFooter && (
              <footer className="modal__footer">
                <Button
                  data-micromodal-close
                  appearance="ghost"
                  variant={cancelButtonColor || "error"}
                  onClick={onCancel}
                  propagateEvent={false}
                >
                  {cancelButtonText || t("Cancel")}
                </Button>
                <Button
                  aria-label="Close this dialog window"
                  variant={confirmButtonColor || "success"}
                  loading={loading}
                  onClick={onConfirm}
                  propagateEvent={false}
                >
                  {confirmButtonText || t("Confirm")}
                </Button>
              </footer>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
