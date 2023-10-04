import { rejects } from "assert";

export const toPositionLiteral = (
  position: google.maps.LatLng
): google.maps.LatLngLiteral => {
  return {
    lat: position.lat(),
    lng: position.lng(),
  };
};

export const getGeolocation = () => {
  return new Promise<any>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (!position) {
        return reject("City not found");
      }

      const latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      resolve(latlng);
    });
  });
};

export const getPositionFromAddress = (
  address: string
): Promise<google.maps.LatLng> => {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: address }, (results, status) => {
      if (!results || status !== "OK") {
        return reject("City not found");
      }

      if (status === "OK") {
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
