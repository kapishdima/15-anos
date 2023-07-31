import React from 'react';
import classNames from 'classnames';

import { translated } from '@/app/utils/locale';
import { useCategoriesStore } from '../store/categories';
import { getCategoryById } from '../store/categories.selector';

type CategoryTitleProps = {
  caterogyId: string;
};

export const CategoryTitle: React.FC<CategoryTitleProps> = ({ caterogyId }) => {
  const category = useCategoriesStore((state) => getCategoryById(state, caterogyId));

  if (!category) {
    return null;
  }

  return <div className={classNames('task-list__month')}>{translated(category.title)}</div>;
};
