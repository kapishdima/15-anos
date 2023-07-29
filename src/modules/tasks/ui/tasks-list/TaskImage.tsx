import React from 'react';

import artists from '@/image/tasks/artists.svg';
import cake from '@/image/tasks/cake.svg';
import catering from '@/image/tasks/catering.svg';
import ceremony from '@/image/tasks/ceremony.svg';
import corte from '@/image/tasks/corte.svg';
import dances from '@/image/tasks/dance.svg';
import decor from '@/image/tasks/decor.svg';
import dress from '@/image/tasks/dress.svg';
import event_day from '@/image/tasks/event_day.svg';
import gifts from '@/image/tasks/gifts.svg';
import guests from '@/image/tasks/guests.svg';
import invite from '@/image/tasks/invite.svg';
import music from '@/image/tasks/music.svg';
import other from '@/image/tasks/other.svg';
import planner from '@/image/tasks/planner.svg';
import venue from '@/image/tasks/venue.svg';
import videograpafer from '@/image/tasks/videograpafer.svg';
import visagiste from '@/image/tasks/visagiste.svg';
import host from '@/image/tasks/host.svg';
import photographer from '@/image/tasks/photographer.svg';
import shopping from '@/image/tasks/shopping.svg';
import stylist from '@/image/tasks/stylist.svg';
import traditions from '@/image/tasks/traditions.svg';
import transport from '@/image/tasks/transport.svg';
import transportForGuest from '@/image/tasks/stylist.svg';

const images = {
  artists,
  cake,
  catering,
  ceremony,
  'court of honor': corte,
  dances,
  decor,
  dress,
  'event day': event_day,
  'gifts for the court of honor': gifts,
  guests,
  invitations: invite,
  music,
  other,
  'event planner': planner,
  location: venue,
  videographer: videograpafer,
  'master of ceremonies': host,
  'make-up artist': visagiste,
  photographer,
  shopping,
  stylist,
  traditions,
  transport,
  'transport for guests': transportForGuest,
};

export const getCategoryImage = (category: keyof typeof images) => {
  return images[category.toLowerCase() as keyof typeof images];
};
