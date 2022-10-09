import React from 'react';
import { useSelector } from 'react-redux';

const Channels = () => {
  const channels = useSelector((state) => state.channels);
  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">Rfyfks</div>
      <ul>
        { channels.ids.map((id) => <li key={id}>{channels.entities[id].name}</li>)}
      </ul>
    </div>
  );
};

export default Channels;
