import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useCurrentUser } from '../contexts/CurrentUser';

const Header = () => {
  const { t } = useTranslation();

  const { currentUser, logOut } = useCurrentUser();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('header.title')}</a>
        {currentUser && (
        <Button
          variant="primary"
          className="btn btn-primary"
          onClick={logOut}
        >
          {t('signOut')}
        </Button>
        )}
      </div>
    </nav>
  );
};

export default Header;
