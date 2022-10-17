import axios from 'axios';
import { useMemo } from 'react';

const useClient = () => {
  const client = axios.create();
  const token = localStorage.getItem('token');
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
  return useMemo(() => client, [token]);
};

export default useClient;
