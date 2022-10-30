import React from 'react';
import ChannelsListHeader from './components/ChannelListHeader';
import ChannelList from './components/ChannelList';

const Channels = () => (
  <div className="col-4 col-md-3 col-lg-2 border-end pt-5 px-0 bg-light">
    <ChannelsListHeader />
    <ChannelList />
  </div>
);

export default Channels;
