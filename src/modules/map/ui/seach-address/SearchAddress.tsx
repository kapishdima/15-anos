import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Button, Form, TextField, useModal } from "@/components";
import { AppRoutes } from "@/app/router/routes";
import { getGeolocation, getPositionFromAddress } from "../../api/map";
import { LOCATION_MODAL_ID } from "@/modules/vendors/ui/modals/LocationModal";
import { useSearchVendorStore } from "@/modules/vendors/store/search-vendors.store";

type SearchAddressProps = {
  setCenter: (center: google.maps.LatLngLiteral) => void;
  setMarker: (position: google.maps.LatLng) => void;
};

export const SearchAddress: React.FC<SearchAddressProps> = ({
  setCenter,
  setMarker,
}) => {
  const navigate = useNavigate();
  const { close } = useModal();

  const onSubmit = async (values: any) => {
    try {
      const position = await getPositionFromAddress(values.address);
      setCenter(position as google.maps.LatLngLiteral);
      setMarker(position as google.maps.LatLng);

      setTimeout(() => {
        navigate(AppRoutes.SEARCH_VENDORS);
        close(LOCATION_MODAL_ID);
        window.location.reload();
      }, 500);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const onGeolocationClick = async () => {
    const position = await getGeolocation();
    setMarker(position as google.maps.LatLng);
    setCenter(position as google.maps.LatLngLiteral);
  };

  return (
    <div className="search-address-form">
      <h4 className="search-address-form__title">Search by address</h4>
      <Form classes="search-address-form__container" onSubmit={onSubmit}>
        <TextField
          name="address"
          placeholder="Enter your address"
          variant="filled"
          style={{}}
        />

        <div className="search-address-form__actions">
          <Button
            appearance="ghost"
            variant="success"
            onClick={onGeolocationClick}
          >
            Use my geolocation
          </Button>
          <Button variant="success" type="submit">
            Save the city
          </Button>
        </div>
      </Form>
    </div>
  );
};
