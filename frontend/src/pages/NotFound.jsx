import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Header from '../commonComponents/Header';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="container h-100">
      <Header />
      <div className="d-flex flex-column text-center my-auto">
        <h2>{t('pageNotFound.title')}</h2>
        <p className="text-center">
          <span>{t('pageNotFound.go')}</span>
          {' '}
          <Link to="/">{t('goHome')}</Link>
        </p>

      </div>
    </div>
  );
};

export default NotFound;
