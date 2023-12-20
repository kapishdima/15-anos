import React from "react";
import { Card } from "@/components";
import { Guest, GuestStatuses, useGuestsStore } from "../../store/guests";

import QuestionIcon from "@image/icons/question.svg";
import ConfirmedIcon from "@image/icons/confirmed.svg";
import InvitedIcon from "@image/icons/invited.svg";
import WontComeIcon from "@image/icons/wont_come.svg";

import { GuestsStatus } from "../buttons/GuestStatus";

import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/router/routes";
import { RoleActions } from "@/modules/roles";

type GuestCardProps = { guest: Guest };

const statusesIcons = {
  none: QuestionIcon,
  confirmed: ConfirmedIcon,
  confirmedGuest: ConfirmedIcon,
  invited: InvitedIcon,
  declined: WontComeIcon,
  declinedGuest: WontComeIcon,
};

const statusColors = {
  none: "DCDCDD",
  confirmed: "50DF71",
  confirmedGuest: "50DF71",
  invited: "FEE106",
  declined: "FE3636",
  declinedGuest: "FE3636",
};

export const GuestCard: React.FC<GuestCardProps> = ({ guest }) => {
  const { id, name, status, guests, kids } = guest;

  const guestsTitle = guests > 0 ? ` +${guests}` : "";
  const kidsTitle = kids > 0 ? ` +${kids} (kids)` : "";
  const cardTitle =
    name + guestsTitle + (guestsTitle && kidsTitle ? ", " : "") + kidsTitle;

  const navigate = useNavigate();

  const setCurrentGuest = useGuestsStore((state) => state.setCurrentGuest);
  const removeGuest = useGuestsStore((state) => state.removeGuest);
  const fetchGuests = useGuestsStore((state) => state.fetchGuests);
  const changeGuestStatus = useGuestsStore((state) => state.changeGuestStatus);

  const isRemoval = useGuestsStore((state) => state.isRemoval);
  const loading = useGuestsStore((state) => state.loading);

  const onOpen = () => {
    setCurrentGuest(guest);
    navigate(AppRoutes.UPDATE_GUEST);
  };

  const onDelete = (id: string) => {
    removeGuest(id);
    fetchGuests(/*force*/ true);
  };

  const onUpdateGuestStatus = async (status: string) => {
    await changeGuestStatus(id, status as GuestStatuses);
    fetchGuests(/*force*/ true);
  };

  return (
    <>
      <Card
        id={id}
        title={cardTitle}
        icon={statusesIcons[status]}
        color={statusColors[status]}
        onOpen={onOpen}
        onDelete={onDelete}
        extra={<GuestsStatus onSelect={onUpdateGuestStatus} />}
        hoverable={false}
        loading={loading}
        removal={isRemoval}
        action={[RoleActions.EDIT_GUEST]}
      />
    </>
  );
};
