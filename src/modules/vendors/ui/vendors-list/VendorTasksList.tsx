import React, { useEffect } from "react";
import { useVendorsRelations } from "../../store/vendors-relations";
import { TaskCard } from "@/modules/tasks";
import { getCategoryById, useCategoriesStore } from "@/modules/categories";
import { Link } from "react-router-dom";
import { Button, Spinner } from "@/components";
import { AppRoutes } from "@/app/router/routes";

type VendorTasksListProps = {
  id: string;
  categoryId: string;
};

export const VendorTasksList: React.FC<VendorTasksListProps> = ({
  id,
  categoryId,
}) => {
  const fetchTasks = useVendorsRelations((state) => state.fetchVendorTasks);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  const tasks = useVendorsRelations((state) => state.tasks);
  const categories = useCategoriesStore((state) => state.categories);
  const loading = useVendorsRelations((state) => state.loading);

  useEffect(() => {
    fetchTasks(id);
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="vendor-relation--loading">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="vendor-relation">
      <div className="vendor-relation-list">
        {tasks.map((task) => {
          const category = getCategoryById(categories, task.categoryId);
          return (
            <TaskCard
              task={task}
              isRemoval={false}
              color={category?.color}
              categoryId={category?.id || ""}
              onUpdateStatusSuccess={() => fetchTasks(id)}
            />
          );
        })}
      </div>
      <Link
        to={`${AppRoutes.CREATE_TASK}?vendorId=${id}&categoryId=${categoryId}`}
        className="without-decoration"
      >
        <Button variant="success">Add a task</Button>
      </Link>
    </div>
  );
};
