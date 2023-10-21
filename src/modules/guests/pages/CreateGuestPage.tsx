import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  AppLayout,
  Button,
  Form,
  FormActions,
  FormContent,
  PageHeader,
} from "@/components";
import { CreateGuestForm } from "../ui/create-guest/CreateGuestForm";
import { createGuestSchemaValidation } from "../validation/guests.schema";
import { useGuestsStore } from "../store/guests";

const defaultValues = {
  name: "",
  status: "none",
};

export const CreateGuestPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const addGuest = useGuestsStore((state) => state.addGuest);
  const fetchGuests = useGuestsStore((state) => state.fetchGuests);
  const loading = useGuestsStore((state) => state.loading);

  const createGuest = async (values: any) => {
    await addGuest(values);
    await fetchGuests(/*force*/ true);
    navigate(-1);
  };

  return (
    <AppLayout>
      <PageHeader title={t("Guest")} hasBackButton />

      <div className="vendors-page-container">
        <FormContent>
          <Form
            onSubmit={createGuest}
            initialValues={defaultValues}
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
              <Button
                aria-label="Close this dialog window"
                variant="success"
                loading={loading}
                type="submit"
              >
                {t("Add guests")}
              </Button>
            </FormActions>
          </Form>
        </FormContent>
      </div>
    </AppLayout>
  );
};
