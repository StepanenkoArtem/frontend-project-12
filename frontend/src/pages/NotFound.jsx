import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../commonComponents/Header';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="d-flex flex-column h-100">
        {t('pageNotFound.title')}
        {t('PageNotFound.text')}
      </div>
    </>
  );
};

export default NotFound;
