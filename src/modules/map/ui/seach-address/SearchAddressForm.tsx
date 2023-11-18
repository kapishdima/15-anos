import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Button, Form, TextField } from "@/components";
import { AppRoutes } from "@/app/router/routes";

import {
  getGeolocation,
  getPositionFromAddress,
  savePosition,
  toPositionLiteral,
} from "../../api/map";
import { WITH_MARKER_ZOOM } from "../map/Map";
import { useTranslation } from "react-i18next";

type SearchAddressProps = {
  setCenter: (center: google.maps.LatLngLiteral) => void;
  setMarker: (position: google.maps.LatLng) => void;
  setZoom: (zoom: number) => void;
  position: google.maps.LatLng | null;
};

export const SearchAddressForm: React.FC<SearchAddressProps> = ({
  setCenter,
  setMarker,
  setZoom,
  position,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const searchAndApplyPosition = async (values: any) => {
    try {
      const position = await getPositionFromAddress(values.address);
      setCenter(toPositionLiteral(position));
      setMarker(position);
      setZoom(WITH_MARKER_ZOOM);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const saveSelectedAddress = () => {
    if (!position) {
      return toast.error("City not found");
    }
    navigate(AppRoutes.SEARCH_VENDORS);
    savePosition(position);
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
      <h4 className="search-address-form__title">{t("Search by address")}</h4>
      <Form
        classes="search-address-form__container"
        onSubmit={searchAndApplyPosition}
        submitAfterDelay
      >
        <div className="search-address-form__row">
          <TextField
            name="address"
            placeholder="Mark your city on the map or enter its name"
            variant="filled"
            capitilizedInput
          />
          <Button type="submit">{t("Search")}</Button>
        </div>
        <div className="search-address-form__actions">
          <Button
            appearance="outline"
            variant="success"
            type="button"
            onClick={onGeolocationClick}
          >
            {t("Use my geolocation")}
          </Button>
          <Button variant="success" type="button" onClick={saveSelectedAddress}>
            {t("Save the city")}
          </Button>
        </div>
      </Form>
    </div>
  );
};
