import React from "react";

import { AddFilledIcon, IconButton } from "@/components";
import { Protected, RoleActions } from "@/modules/roles";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/app/router/routes";

export const CreateGuest: React.FC = () => {
  return (
    <Protected action={RoleActions.CREATE_GUEST}>
      <Link to={AppRoutes.CREATE_GUEST}>
        <IconButton appearance="filled" variant="white" propagateEvent>
          <AddFilledIcon />
        </IconButton>
      </Link>
    </Protected>
  );
};
