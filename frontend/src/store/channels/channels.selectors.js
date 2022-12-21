import { createSelector } from '@reduxjs/toolkit';
import { channelsAdapter } from './channels.slice';

const channelNamesSelector = createSelector(
  (state) => state.channels,
  (channels) => channels.ids.map((id) => channels.entities[id].name),
);

const selectors = channelsAdapter.getSelectors((state) => state.channels);

const channelsSelector = createSelector(
  (state) => state.channels,
  (channels) => channels.ids.map((id) => channels.entities[id]),
);

const channelErrorSelector = createSelector(
  (state) => state.channels,
  (channels) => channels.error,
);

const currentChannelSelector = createSelector(
  (state) => state.channels,
  (channels) => channels.entities[channels.currentChannelId],
);

const defaultChannelSelector = createSelector(
  (state) => state.channels,
  (channels) => channels.entities[channels.defaultChannelId],
);

export {
  channelNamesSelector,
  currentChannelSelector,
  channelErrorSelector,
  channelsSelector,
  defaultChannelSelector,
  selectors,
};
