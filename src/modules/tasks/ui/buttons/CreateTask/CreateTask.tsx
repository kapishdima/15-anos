import React from "react";
import { Link } from "react-router-dom";

import { AddFilledIcon, IconButton } from "@components/index";

import { Protected, RoleActions } from "@modules/roles";
import { AppRoutes } from "@/app/router/routes";

export const CreateTask: React.FC = () => {
  return (
    <Protected action={RoleActions.CREATE_TASK}>
      <Link to={AppRoutes.CREATE_TASK}>
        <IconButton appearance="filled" variant="white" propagateEvent>
          <AddFilledIcon />
        </IconButton>
      </Link>
    </Protected>
  );
};
