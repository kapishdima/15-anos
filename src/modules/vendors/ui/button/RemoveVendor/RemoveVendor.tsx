import React from "react";
import { TrashIcon } from "@components/icons";
import { CheckIcon, IconButton } from "@components/index";

import { Protected, RoleActions } from "@modules/roles";
import { useTasksStore } from "@/modules/tasks";
import { useVendorsStore } from "@/modules/vendors/store/vendors.store";

export const RemoveVendor: React.FC = () => {
  const toggleVendorsRemoval = useVendorsStore(
    (state) => state.toggleVendorsRemoval
  );
  const removal = useTasksStore((state) => state.isRemoval);

  const onClick = () => {
    toggleVendorsRemoval();
  };

  return (
    <Protected action={RoleActions.DELETE_TASK}>
      <IconButton appearance="filled" variant="white" onClick={onClick}>
        {removal ? <CheckIcon /> : <TrashIcon />}
      </IconButton>
    </Protected>
  );
};
