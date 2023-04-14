export type EventDetails = {
  eventNumber: string;
  eventTitle: string;
  userId: string;
};

export type UserRoles = 'owner' | 'assistant' | 'viewer';

export type LoginCredentials = {
  password: string;
  eventTitle?: string;
};

export type LoginPayload = LoginCredentials & {
  role: UserRoles;
};

export type CreateProfileCredentials = {
  date: string;
  guests: number;
  country: string;
  language: string;
  currency: string;
};

export type CreateProfilePayload = CreateProfileCredentials & {};
