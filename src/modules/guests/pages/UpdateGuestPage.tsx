import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  AppLayout,
  Button,
  DeleteButton,
  Form,
  FormActions,
  FormContent,
  PageHeader,
} from "@/components";
import { CreateGuestForm } from "../ui/create-guest/CreateGuestForm";
import { createGuestSchemaValidation } from "../validation/guests.schema";
import { useGuestsStore } from "../store/guests";

export const UpdateGuestPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const updateGuest = useGuestsStore((state) => state.updateGuest);
  const fetchGuests = useGuestsStore((state) => state.fetchGuests);
  const removeGuest = useGuestsStore((state) => state.removeGuest);
  const guest = useGuestsStore((state) => state.currentGuest);
  const loading = useGuestsStore((state) => state.loading);

  const submitUpdateGuest = async (values: any) => {
    if (!guest) {
      return;
    }

    await updateGuest(guest.id, values);
    await fetchGuests(/*force*/ true);
    navigate(-1);
  };

  const onDelete = async () => {
    if (!guest) {
      return;
    }

    await removeGuest(guest.id);
    await fetchGuests(/*force*/ true);
    navigate(-1);
  };

  return (
    <AppLayout>
      <PageHeader title={t("Guest")} hasBackButton />

      <div className="vendors-page-container">
        <FormContent>
          <Form
            onSubmit={submitUpdateGuest}
            initialValues={guest}
            schema={createGuestSchemaValidation}
          >
            <CreateGuestForm />
            <FormActions>
              <Button
                appearance="ghost"
                variant="error"
                onClick={() => navigate(-1)}
              >
                {t("Cancel")}
              </Button>
              <DeleteButton onDelete={onDelete} id={guest?.id || ""} />
              <Button
                aria-label="Close this dialog window"
                variant="success"
                loading={loading}
                type="submit"
              >
                {t("Save guests")}
              </Button>
            </FormActions>
          </Form>
        </FormContent>
      </div>
    </AppLayout>
  );
};
