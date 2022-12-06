import React from 'react';
import Chat from '../Chat/Chat';
import Header from '../../commonComponents/Header';

const Home = () => (
  <div className="d-flex flex-column h-100">
    <Header />
    <Chat />
  </div>
);

export default Home;
