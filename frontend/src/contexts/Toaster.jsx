import React, {
  createContext, useContext, useEffect, useMemo,
} from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { alertSelector } from '../store/ui/ui.selectors';
import { removeAlert } from '../store/ui/ui.slice';

export const Toaster = createContext({
  notify: () => {},
});

export const ToasterProvider = ({ children }) => {
  const alert = useSelector(alertSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (!alert.message) return;
    const types = {
      SUCCESS: toast.success,
      ERROR: toast.error,
    };

    types[alert.type](t(alert.message), {
      onChange: () => dispatch(removeAlert()),
    });
  }, [alert, dispatch, t]);

  return (
    <Toaster.Provider value={useMemo(() => {}, [])}>
      {children}
    </Toaster.Provider>
  );
};

export const useCurrentSocket = () => useContext(Toaster);
