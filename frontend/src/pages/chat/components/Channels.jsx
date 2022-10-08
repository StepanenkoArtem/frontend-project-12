import React from 'react';
import { useSelector } from 'react-redux';

const Channels = () => {
  const channels = useSelector((state) => state.channels);
  return (
    <div className="col-3 bg-danger">
      <ul>
        { channels.ids.map((id) => <li key={id}>{channels.entities[id].name}</li>)}
      </ul>
    </div>
  );
};

export default Channels;
