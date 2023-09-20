export const getGeolocation = () => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (!position) {
        return resolve(null);
      }

      const latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      resolve(latlng);
    });
  });
};

export const getPositionFromAddress = (address: string) => {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: address }, (results, status) => {
      if (!results || status !== "OK") {
        return reject("City not found");
      }

      if (status === "OK") {
        savePosition(results[0].geometry.location);
        return resolve(results[0].geometry.location);
      }
    });
  });
};

export const savePosition = (position: any) => {
  window.localStorage.setItem("user_position", JSON.stringify(position));
};

export const getPosition = () => {
  const position = window.localStorage.getItem("user_position");

  if (!position) {
    return null;
  }

  return JSON.parse(position);
};

export const clearPosition = () => {
  window.localStorage.removeItem("user_position");
};
