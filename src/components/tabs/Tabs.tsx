import classNames from 'classnames';
import React, { useState } from 'react';

type Tab = {
  title: string;
  component: JSX.Element;
};

type TabsProps = {
  tabs: Tab[];
};

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs">
      <div className="tabs-pills">
        {tabs.map((tab, index) => (
          <div
            className={classNames('tabs-pill', { 'tabs-pill--active': index === activeTab })}
            onClick={() => changeTab(index)}
            key={tab.title}>
            {tab.title}
          </div>
        ))}
      </div>
      <div className="tabs-content">{tabs[activeTab].component}</div>
    </div>
  );
};
