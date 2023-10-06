import React from "react";

import { BackButton, PageHint, PageTitle } from "@components/index";
import { useTranslation } from "react-i18next";

type PageHeaderProps = {
  title?: string | null;
  hint?: string | null;
  actions?: JSX.Element;
  hasBackButton?: boolean;
  backURL?: string;
  onBack?: () => void;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  actions,
  hint,
  hasBackButton,
  backURL,
  onBack,
}) => {
  const { t } = useTranslation();
  return (
    <div className="page-header">
      <div className="page-header__row">
        {hasBackButton && <BackButton onBack={onBack} backURL={backURL} />}
        {title && <PageTitle>{t(title)}</PageTitle>}
        {<div className="page-header__actions">{actions}</div>}
      </div>
      {hint && <PageHint>{t(hint)}</PageHint>}
    </div>
  );
};
