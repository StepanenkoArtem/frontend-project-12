import React from 'react';
import { useDispatch } from 'react-redux';
import ChannelsListHeader from './components/ChannelListHeader';
import ChannelList from './components/ChannelList';
import useClient from '../../../hooks/useClient';
import { fetchChannels } from '../../../slices/channelsSlice';

const Channels = () => {
  const client = useClient();
  const dispatch = useDispatch();

  dispatch(fetchChannels(client));

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <ChannelsListHeader />
      <ChannelList />
    </div>
  );
};

export default Channels;
