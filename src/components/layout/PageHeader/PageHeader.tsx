import React from 'react';
import { PageTitle } from '../../heading/PageTitle';

type PageHeaderProps = {
  title: string;
  actions?: JSX.Element;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, actions }) => {
  return (
    <div className="page-header">
      <PageTitle>{title}</PageTitle>
      {actions && <div className="page-header__actions">{actions}</div>}
    </div>
  );
};
