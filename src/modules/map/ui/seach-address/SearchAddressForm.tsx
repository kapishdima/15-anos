import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Button, Form, TextField, useModal } from "@/components";
import { AppRoutes } from "@/app/router/routes";
import { LOCATION_MODAL_ID } from "@/modules/vendors/ui/modals/LocationModal";

import {
  getGeolocation,
  getPositionFromAddress,
  savePosition,
  toPositionLiteral,
} from "../../api/map";

type SearchAddressProps = {
  setCenter: (center: google.maps.LatLngLiteral) => void;
  setMarker: (position: google.maps.LatLng) => void;
  position: google.maps.LatLng | null;
};

export const SearchAddressForm: React.FC<SearchAddressProps> = ({
  setCenter,
  setMarker,
  position,
}) => {
  const navigate = useNavigate();
  const { close } = useModal();

  const searchAndApplyPosition = async (values: any) => {
    try {
      const position = await getPositionFromAddress(values.address);
      setCenter(toPositionLiteral(position));
      setMarker(position);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const saveSelectedAddress = () => {
    if (!position) {
      return toast.error("City not found");
    }
    navigate(AppRoutes.SEARCH_VENDORS);
    close(LOCATION_MODAL_ID);
    savePosition(position);
    window.location.reload();
  };

  const onGeolocationClick = async () => {
    try {
      const position = await getGeolocation();
      if (!position) {
        return;
      }

      setMarker(position as google.maps.LatLng);
      setCenter(position as google.maps.LatLngLiteral);
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="search-address-form">
      <h4 className="search-address-form__title">Search by address</h4>
      <Form
        classes="search-address-form__container"
        onSubmit={searchAndApplyPosition}
      >
        <TextField
          name="address"
          placeholder="Enter your address"
          variant="filled"
          capitilizedInput
        />
        <div className="search-address-form__actions">
          <Button
            appearance="ghost"
            variant="success"
            type="button"
            onClick={onGeolocationClick}
          >
            Use my geolocation
          </Button>
          <Button variant="success" type="button" onClick={saveSelectedAddress}>
            Save the city
          </Button>
        </div>
      </Form>
    </div>
  );
};
