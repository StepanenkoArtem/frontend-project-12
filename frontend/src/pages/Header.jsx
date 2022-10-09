import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('header.title')}</a>
        <Button
          variant="primary"
          ype="submit"
          className="btn btn-primary"
          onSubmit={() => {}}
        >
          {t('header.signOutButton')}
        </Button>
      </div>
    </nav>
  );
};

export default Header;
