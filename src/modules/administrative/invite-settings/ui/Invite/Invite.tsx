import { Button, Popover, useModal } from "@/components";
import React, { useRef, useState } from "react";
import { InviteModal } from "./InviteModal";
import { useProfileStore } from "@/modules/profile";
import { useTranslation } from "react-i18next";

const INVITATION_MODAL_ID = "invitation_modal";

export const InviteRoles: React.FC = () => {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);
  const [role, setRole] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { open, close } = useModal();

  const passwords = useProfileStore((state) => state.profilePasswords);

  const toogleOpened = () => {
    setOpened((_opened) => !_opened);
  };

  const onClick = (role: string) => {
    setRole(role);
    open(INVITATION_MODAL_ID);
  };

  return (
    <>
      <Popover
        ref={triggerRef}
        opened={opened}
        onClickOutside={() => setOpened(false)}
        placement="bottom-end"
        triggerElement={
          <Button ref={triggerRef} variant="success" onClick={toogleOpened}>
            {t("Send an invitation")}
          </Button>
        }
      >
        <div className="role-item" onClick={() => onClick("ownerPassword")}>
          {t("Owner")}
        </div>
        <div className="role-item" onClick={() => onClick("assistantPassword")}>
          {t("Assistant")}
        </div>
        <div className="role-item" onClick={() => onClick("viewerPassword")}>
          {t("Observer")}
        </div>
      </Popover>
      <InviteModal
        id={INVITATION_MODAL_ID}
        // @ts-ignore
        password={passwords ? passwords[role] : ""}
        onCancel={() => close(INVITATION_MODAL_ID)}
      />
    </>
  );
};
