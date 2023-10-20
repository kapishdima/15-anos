import React, { useEffect } from "react";
import {
  AppLayout,
  Button,
  Form,
  PageHeader,
  TextField,
} from "@components/index";

import { useTranslation } from "react-i18next";
import { useProfileStore } from "@/modules/profile/store/profile";

import { PasswordItem } from "../ui/PasswordItem/PasswordItem";

export const InviteSettingsIndex: React.FC = () => {
  const { t } = useTranslation();

  const fetchPasswords = useProfileStore((state) => state.fetchPasswords);
  const fetchEventTitle = useProfileStore((state) => state.fetchEventTitle);
  const saveEventTitle = useProfileStore((state) => state.saveEventTitle);

  const eventTitle = useProfileStore((state) => state.eventTitle);
  const fetchLoading = useProfileStore((state) => state.fetchLoading);
  const saveLoading = useProfileStore((state) => state.saveLoading);
  const passwords = useProfileStore((state) => state.profilePasswords);

  const initialValues = {
    eventTitle: eventTitle || "",
  };

  const onSubmit = async (values: any) => {
    await saveEventTitle(values.eventTitle);
    fetchEventTitle();
  };

  useEffect(() => {
    fetchPasswords();
    fetchEventTitle();
  }, []);

  return (
    <AppLayout loading={fetchLoading}>
      <div className="home-page">
        <PageHeader title="Invite" />

        <div className="invite-settings">
          <div className="password-list">
            <PasswordItem
              role="Owner"
              description="This role the same access as yours. To log in, you will need to specify the name of the event"
              password={passwords?.ownerPassword || "Loading..."}
            />
            <PasswordItem
              role="Assistant"
              description="This role does not allow access to the settings, on the Home screen and does not allow to delete anything, but allows to edit and add information"
              password={passwords?.assistantPassword || "Loading..."}
            />
            <PasswordItem
              role="Viewer"
              description="This role does not allow to settings on the Home screen and does not allow to add, edit or delete information"
              password={passwords?.viewerPassword || "Loading..."}
            />
          </div>
          <Form onSubmit={onSubmit} initialValues={initialValues}>
            <TextField
              name="eventTitle"
              label="Event name"
              placeholder="Enter event name"
            />
            <Button type="submit" variant="success" loading={saveLoading}>
              {t("Save the event name")}
            </Button>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
};
