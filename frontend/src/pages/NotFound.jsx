import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';

const NotFound = () => {
  const { t } = useTranslation();
  return (

    <div className="d-flex flex-column h-100">
      <Header />
      {t('pageNotFound.title')}
      {t('PageNotFound.text')}
    </div>
  );
};

export default NotFound;
