import React, { PropsWithChildren, useEffect, useState } from 'react';

type UserLocation = {
  country: string;
  timezone: string;
  currency: string;
};

export const UserLocationContext = React.createContext<UserLocation | null>(null);

export const UserLocationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [country, setCountry] = useState('');
  const [timezone, setTimezone] = useState('');
  const [currency, setCurrency] = useState('');

  const fetchUserLocation = async () => {
    const response = await fetch('http://www.geoplugin.net/json.gp');
    const location = await response.json();

    if (location) {
      setCountry(location.geoplugin_countryCode);
      setTimezone(location.geoplugin_timezone);
      setCurrency(location.geoplugin_currencyCode);
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
