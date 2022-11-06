import { createSelector } from '@reduxjs/toolkit';

const channelNamesSelector = createSelector(
  (state) => state.channels,
  (channels) => channels.ids.map((id) => channels.entities[id].name),
);

export default channelNamesSelector;
