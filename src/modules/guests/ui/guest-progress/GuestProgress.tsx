import React, { useEffect, useState } from "react";
import { ProgressCard } from "@components/index";
import { useGuestsStore } from "../../store/guests";
import {
  amountConfirmedGuests,
  amountConfirmedGuestsWithExtraGuests,
  amountDeclinedGuests,
  amountGuests,
  amountInvitedGuests,
  amountKidsGuest,
  amountNotInvitedGuests,
} from "../../store/guests.selector";
import { useTranslation } from "react-i18next";

const toPercent = (from: number, to: number) => (from / to) * 100;

export const GuestProgress = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState(0);

  const guests = useGuestsStore(amountGuests);
  const confirmedGuests = useGuestsStore(amountConfirmedGuests);
  const confirmedGuestsWithExtraGuest = useGuestsStore(
    amountConfirmedGuestsWithExtraGuests
  );
  const invitedGuests = useGuestsStore(amountInvitedGuests);
  const declinedGuests = useGuestsStore(amountDeclinedGuests);
  const notInvitedGuests = useGuestsStore(amountNotInvitedGuests);
  const kidsGuests = useGuestsStore(amountKidsGuest);

  const confirmedPercent = toPercent(confirmedGuestsWithExtraGuest, guests);
  const invitedPercent = toPercent(invitedGuests, guests);
  const declinedPercent = toPercent(declinedGuests, guests);

  const progressBarBgGradient = `linear-gradient(to right, #50DF71 0, #50DF71 ${confirmedPercent}%, #FEE106 ${confirmedPercent}%, #FEE106 ${
    confirmedPercent + invitedPercent
  }%, #FE3636 ${confirmedPercent + invitedPercent}%, #FE3636 ${
    confirmedPercent + invitedPercent + declinedPercent
  }%, #FAFAFC ${
    confirmedPercent + invitedPercent + declinedPercent
  }%, #FAFAFC ${
    confirmedPercent + invitedPercent + declinedPercent + notInvitedGuests
  }%) `;

  useEffect(() => {
    const id = setTimeout(() => {
      const progress = (confirmedGuests / guests) * 100;
      setValue(progress);
    }, 300);

    return () => clearTimeout(id);
  }, []);

  return (
    <ProgressCard
      title="Guest confirmations"
      value={value}
      hint={`${confirmedGuestsWithExtraGuest} ${t(
        "guests_confirmations_2"
      )} ${guests} ${t("guests_confirmations_3")} ${
        kidsGuests > 0 ? `${t("pluskids1")} ${kidsGuests}` : ""
      }`}
      bgColor={progressBarBgGradient}
      fullWithBar
    />
  );
};
