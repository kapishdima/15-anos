import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

type Tab = {
  title: string;
  component: JSX.Element;
};

type TabsProps = {
  tabs: Tab[];
  extra?: JSX.Element;
};

export const Tabs: React.FC<TabsProps> = ({ tabs, extra }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (index: number) => {
    setActiveTab(index);
    searchParams.set('activeTab', `${index}`);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const tab = searchParams.get('activeTab');
    setActiveTab(parseInt(tab || '0'));
  }, []);

  return (
    <div className="tabs">
      <div className="tabs-pills">
        {tabs.map((tab, index) => (
          <div
            className={classNames('tabs-pill', { 'tabs-pill--active': index === activeTab })}
            onClick={() => changeTab(index)}
            key={tab.title}>
            {t(tab.title)}
          </div>
        ))}
      </div>
      {extra}
      <div className="tabs-content">{tabs[activeTab].component}</div>
    </div>
  );
};
