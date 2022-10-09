import React from 'react';
import { useSelector } from 'react-redux';

const ChannelList = () => {
  console.log('Channels');

  const channels = useSelector((state) => state.channels);

  return (
    <ul>
      { channels.ids.map((id) => <li key={id}>{channels.entities[id].name}</li>)}
    </ul>
  );
};

export default ChannelList;
