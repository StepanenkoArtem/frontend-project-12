import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUser';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useCurrentUser();

  const logout = () => {
    window.localStorage.removeItem('token');
    setCurrentUser();
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser]);

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('header.title')}</a>
        <Button
          variant="primary"
          className="btn btn-primary"
          onClick={logout}
        >
          {t('header.signOutButton')}
        </Button>
      </div>
    </nav>
  );
};

export default Header;
