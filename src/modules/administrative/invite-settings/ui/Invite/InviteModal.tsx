import { Button, Modal } from "@/components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type InviteModalProps = {
  id: string;
  password: string;
  onCancel: () => void;
};

export const InviteModal: React.FC<InviteModalProps> = ({
  id,
  password,
  onCancel,
}) => {
  const { t } = useTranslation();
  const body = `${t("invitation_message_1")} ${password} ${t(
    "invitation_message_2"
  )}`;
  const subject = "Quinceañera invite";

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <Modal id={id} title="Invite" hasFooter={false} onCancel={onCancel}>
      <div className="invite-text">
        <h4 className="invite-text__label">Invitation text</h4>
        <p className="invite-text__value">
          {t("invitation_message_1")} <span>{password}</span>{" "}
          {t("invitation_message_2")}
          <a href="quincy.app.link"> quincy.app.link</a>
        </p>
      </div>
      <div className="invite-methods">
        <a
          href={`mailto:?body=${body}&subject=${subject}`}
          className="button primary filled"
        >
          Send email
        </a>
        <Button
          onClick={copyToClipboard}
          variant={copied ? "success" : "primary"}
        >
          {copied ? "Copied" : "Copy text"}
        </Button>
      </div>
    </Modal>
  );
};
