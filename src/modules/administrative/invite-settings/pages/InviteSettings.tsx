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
import { saveEventTitleValidation } from "../validation/save-event-title";
import { Protected, RoleActions } from "@/modules/roles";
import { InviteRoles } from "../ui/Invite/Invite";

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
              role={t("Owner")}
              description={t(
                "This role the same access as yours. To log in, you will need to specify the name of the event"
              )}
              password={passwords?.ownerPassword || t("Loading")}
            />
            <PasswordItem
              role={t("Assistant")}
              description={t(
                "This role does not allow access to the settings, on the Home screen and does not allow to delete anything, but allows to edit and add information"
              )}
              password={passwords?.assistantPassword || t("Loading")}
            />
            <PasswordItem
              role={t("Observer")}
              description={t(
                "This role does not allow to settings on the Home screen and does not allow to add, edit or delete information"
              )}
              password={passwords?.viewerPassword || t("Loading")}
            />
          </div>
          <div className="invite-actions">
            <InviteRoles />
          </div>
          <Protected action={RoleActions.SPECIFY_EVENT_TITLE}>
            <Form
              onSubmit={onSubmit}
              initialValues={initialValues}
              schema={saveEventTitleValidation}
            >
              <TextField
                name="eventTitle"
                label="Event name"
                placeholder="Enter event name"
                hint={
                  t(
                    "The name of the event is used to enter the profile as a partner. It is not shown anywhere."
                  ) || ""
                }
              />
              <Button type="submit" variant="success" loading={saveLoading}>
                {t("Save the event name")}
              </Button>
            </Form>
          </Protected>
        </div>
      </div>
    </AppLayout>
  );
};
