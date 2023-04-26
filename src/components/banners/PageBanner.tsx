import React from 'react';

type PageBannerProps = {
  image: string;
  title: string;
};

export const PageBanner: React.FC<PageBannerProps> = ({ image, title }) => {
  return (
    <div className="page-banner" style={{ backgroundImage: `url(${image})` }}>
      <h2 className="page-banner__title">{title}</h2>
    </div>
  );
};
