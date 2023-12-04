import React, { PropsWithChildren, useEffect, useState } from "react";

type UserLocation = {
  country: string;
  timezone: string;
  currency: string;
};

export const UserLocationContext = React.createContext<UserLocation | null>(
  null
);

export const UserLocationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("");
  const [currency, setCurrency] = useState("");

  const fetchUserLocation = async () => {
    const response = await fetch("https://ipapi.co/json/");
    const location = await response.json();

    if (location) {
      setCountry(location.country_code);
      setTimezone(location.timezone);
      setCurrency(location.currency);
    }
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);

  return (
    <UserLocationContext.Provider value={{ country, timezone, currency }}>
      {children}
    </UserLocationContext.Provider>
  );
};
