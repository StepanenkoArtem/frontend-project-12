import { createSelector } from '@reduxjs/toolkit';
import { channelsAdapter } from './channels.slice';

const channelNamesSelector = createSelector(
  (state) => state.channels,
  (channels) => channels.ids.map((id) => channels.entities[id].name),
);
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelNamesSelector;
