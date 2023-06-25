import React from 'react';

import { BackButton, PageTitle } from '@components/index';

type PageHeaderProps = {
  title?: string | null;
  actions?: JSX.Element;
  hasBackButton?: boolean;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, actions, hasBackButton }) => {
  return (
    <div className="page-header">
      {hasBackButton && <BackButton />}
      {title && <PageTitle>{title}</PageTitle>}
      {<div className="page-header__actions">{actions}</div>}
    </div>
  );
};
