import React, { useRef, useState } from "react";
import { Button, Popover } from "@/components";
import { useTranslation } from "react-i18next";

import QuestionIcon from "@image/icons/question.svg";
import ConfirmedIcon from "@image/icons/confirmed.svg";
import InvitedIcon from "@image/icons/invited.svg";
import WontComeIcon from "@image/icons/wont_come.svg";
import { Protected, RoleActions } from "@/modules/roles";

type GuestsStatusProps = {
  onSelect: (value: string) => void;
};

const statusesIcons = {
  none: QuestionIcon,
  confirmed: ConfirmedIcon,
  invited: InvitedIcon,
  declined: WontComeIcon,
};

const statusColors = {
  none: "#DCDCDD",
  confirmed: "#50DF71",
  invited: "#FEE106",
  declined: "#FE3636",
};

const statuses = [
  {
    value: "none",
    label: "Not invited",
  },
  {
    value: "invited",
    label: "Invited",
  },
  {
    value: "declined",
    label: "Wont't come",
  },
  {
    value: "confirmed",
    label: "Confirmed participation",
  },
];

export const GuestsStatus: React.FC<GuestsStatusProps> = ({ onSelect }) => {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toogleOpened = () => {
    setOpened((_opened) => !_opened);
  };

  return (
    <Protected action={RoleActions.GUEST_STATUS}>
      <div className="guest-statuses">
        <Popover
          className="guests-popover"
          ref={triggerRef}
          opened={opened}
          placement="bottom-end"
          triggerElement={
            <Button
              ref={triggerRef}
              variant="text"
              appearance="outline"
              onClick={toogleOpened}
              propagateEvent={false}
            >
              {t("Status")}
            </Button>
          }
          onClickOutside={() => setOpened(false)}
        >
          {statuses.map((status, index) => (
            <div
              className="select-option"
              key={`${Date.now() + index}_${status.value}`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onSelect(status.value);
              }}
            >
              <div
                className="select-option-icon"
                // @ts-ignore
                style={{ backgroundColor: statusColors[status.value] }}
              >
                {/* @ts-ignore */}
                <img src={statusesIcons[status.value]} alt="" />
              </div>
              <div className="select-option-label">{t(status.label)}</div>
            </div>
          ))}
        </Popover>
      </div>
    </Protected>
  );
};
