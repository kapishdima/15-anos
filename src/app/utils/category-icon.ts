import React from "react";

import artists from "@/image/category/artists.svg";
import beauty from "@/image/category/beauty.svg";
import cake from "@/image/category/cake.svg";
import catering from "@/image/category/catering.svg";
import ceremony from "@/image/category/ceremony.svg";
import coordinator from "@/image/category/coordinator.svg";
import corte from "@/image/category/corte.svg";
import dances from "@/image/category/dance.svg";
import decor from "@/image/category/decor.svg";
import dress from "@/image/category/dress.svg";
import event_day from "@/image/category/event_day.svg";
import flowers from "@/image/category/flowers.svg";
import gifts from "@/image/category/gifts.svg";
import guests from "@/image/category/guests.svg";
import invite from "@/image/category/invite.svg";
import music from "@/image/category/music.svg";
import other from "@/image/category/other.svg";
import planner from "@/image/category/planner.svg";
import venue from "@/image/category/venue.svg";
import videograpafer from "@/image/category/videograpafer.svg";
import visagiste from "@/image/category/visagiste.svg";
import host from "@/image/category/host.svg";
import photographer from "@/image/category/photographer.svg";
import shopping from "@/image/category/shopping.svg";
import stylist from "@/image/category/stylist.svg";
import traditions from "@/image/category/traditions.svg";
import transport from "@/image/category/transport.svg";
import transportForGuest from "@/image/category/guests_transport.svg";
import padrinos from "@/image/category/padrinos.svg";

const images = {
  artists,
  beauty,
  cake,
  catering,
  ceremony,
  "event coordinator": coordinator,
  "court of honor": corte,
  dances,
  decor,
  dress,
  "event day": event_day,
  flowers,
  "gifts for the court of honor": gifts,
  guests,
  invitations: invite,
  padrinos,
  music,
  other,
  "event planner": planner,
  location: venue,
  venue: venue,
  videographer: videograpafer,
  "master of ceremonies": host,
  "make-up artist": visagiste,
  photographer,
  shopping,
  stylist,
  traditions,
  transport,
  "transport for guests": transportForGuest,
};

export const getCategoryImage = (category: keyof typeof images) => {
  return images[category.toLowerCase() as keyof typeof images];
};
