import React, { useEffect } from "react";

import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMap } from "./GoogleMap";
import { Spinner } from "@/components";
import { Marker } from "./Marker";

import MarkerIcon from "@/image/marker.png";
import { SearchAddress } from "../seach-address/SearchAddress";
import { savePosition } from "../../api/map";

const render = (status: Status) => {
  if (status === Status.LOADING) {
    return <Spinner />;
  }

  return <div className="">Error</div>;
};

export const Map: React.FC = () => {
  const [marker, setMarker] = React.useState<google.maps.LatLng | null>(null);
  const [zoom, setZoom] = React.useState(3);
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const onClick = (e: google.maps.MapMouseEvent) => {
    setMarker(e.latLng);
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  useEffect(() => {
    if (marker || (center.lat !== 0 && center.lng !== 0)) {
      savePosition(center);
    }
  }, [center, marker]);

  return (
    <div className="map-container">
      <Wrapper
        apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY!}
        render={render}
      >
        <GoogleMap
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          fullscreenControl={false}
          zoomControl={false}
          mapTypeControl={false}
          streetViewControl={false}
          style={{ flexGrow: "1", height: "50vh" }}
        >
          <Marker
            position={marker}
            icon={{
              url: MarkerIcon,
              // scaledSize: new window.google.maps.Size(48, 48),
            }}
          />
        </GoogleMap>
      </Wrapper>
      <SearchAddress setCenter={setCenter} setMarker={setMarker} />
    </div>
  );
};
