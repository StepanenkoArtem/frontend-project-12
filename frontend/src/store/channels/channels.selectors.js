import { createSelector } from '@reduxjs/toolkit';
import { channelsAdapter } from './channels.slice';

const channelNamesSelector = createSelector(
  (state) => state.channels,
  (channels) => channels.ids.map((id) => channels.entities[id].name),
);

const selectors = channelsAdapter.getSelectors((state) => state.channels);

const channelsSelector = createSelector(
  (state) => state.channels,
  (channels) => channels,
);

const channelErrorSelector = createSelector(
  (state) => state.channels,
  (channels) => channels.error,
);

const activeChannelSelector = createSelector(
  (state) => state,
  (state) => state.channels.entities.find((channel) => channel.id === state.ui.activeChannelId),
);

export {
  channelNamesSelector, channelErrorSelector, channelsSelector, activeChannelSelector, selectors,
};
