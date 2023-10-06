import React from "react";
import { Protected, RoleActions } from "@modules/roles";

import { AddFilledIcon, IconButton } from "@components/index";

import { Link } from "react-router-dom";
import { AppRoutes } from "@/app/router/routes";

export const CreatePayment: React.FC = () => {
  return (
    <Protected action={RoleActions.CREATE_TASK}>
      <Link to={AppRoutes.CREATE_PAYMENT}>
        <IconButton appearance="filled" variant="white" propagateEvent>
          <AddFilledIcon />
        </IconButton>
      </Link>
    </Protected>
  );
};
