import React, { useEffect } from "react";

import { EventEmitter, Events } from "@/app/transport/event-bus";
import { Status, Wrapper } from "@googlemaps/react-wrapper";

import { Spinner } from "@/components";

import { GoogleMap } from "./GoogleMap";
import { Marker } from "./Marker";
import { SearchAddressForm } from "../seach-address/SearchAddressForm";

import MarkerIcon from "@/image/marker.png";
import { getPosition } from "../../api/map";

export const WITH_MARKER_ZOOM = 10;
const DEFAULT_ZOOM = 2.58;

const render = (status: Status) => {
  if (status === Status.LOADING) {
    return <Spinner />;
  }

  return <div className="">Error</div>;
};

export const Map: React.FC = () => {
  const position = getPosition();
  const [marker, setMarker] = React.useState<google.maps.LatLng | null>(
    position || null
  );
  const [zoom, setZoom] = React.useState(
    position ? WITH_MARKER_ZOOM : DEFAULT_ZOOM
  );
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>(
    position || {
      lat: 4.5651835,
      lng: -85.0214022,
    }
  );

  const onClick = (event: google.maps.MapMouseEvent) => {
    setMarker(event.latLng);
    setCenter({ lat: event.latLng?.lat() || 0, lng: event.latLng?.lng() || 0 });
    setZoom(WITH_MARKER_ZOOM);
  };

  const onIdle = (map: google.maps.Map) => {
    setZoom(map.getZoom()!);
    setCenter(map.getCenter()!.toJSON());
  };

  useEffect(() => {
    const position = getPosition();
    if (marker?.lat !== position?.lat || marker?.lng !== position?.lng) {
      EventEmitter.dispatch(Events.POSITION_MODIFY, {
        modified: Boolean(marker),
      });
    }
  }, [marker]);

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
              // @ts-ignore
              scaledSize: { width: 48, height: 48 },
            }}
          />
        </GoogleMap>
      </Wrapper>
      <SearchAddressForm
        setCenter={setCenter}
        setMarker={setMarker}
        setZoom={setZoom}
        position={marker}
      />
    </div>
  );
};
