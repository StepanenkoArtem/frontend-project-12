import React, { useEffect, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ApiPaths from '../config/ApiPaths';
import { CurrentUserContext } from '../contexts/CurrentUser';

const Home = () => {
  const token = localStorage.getItem('token');
  const { client } = useContext(CurrentUserContext);
  const url = ApiPaths.data;
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data: fetchedData } = await client.get(url);
      setData(fetchedData);
    };
    fetchData();
  }, [token, client]);

  return (token
    ? (
      <div>
        <div>CHAT</div>
        <div>{JSON.stringify(data, ' ', 4)}</div>
      </div>
    )
    : <Navigate to="login" />
  );
};

export default Home;
