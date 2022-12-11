import { createSelector } from '@reduxjs/toolkit';
import { channelsAdapter } from './channels.slice';

const channelNamesSelector = createSelector(
  (state) => state.channels,
  (channels) => channels.ids.map((id) => channels.entities[id].name),
);

const channelErrorSelector = createSelector(
  (state) => state.channels,
  (channels) => channels.error,
);

export { channelNamesSelector, channelErrorSelector };
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
