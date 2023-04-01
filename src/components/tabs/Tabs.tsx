import classNames from 'classnames';
import React, { useState } from 'react';

type TabsProps = {
  tabs: string[];
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
            onClick={() => changeTab(index)}>
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};
