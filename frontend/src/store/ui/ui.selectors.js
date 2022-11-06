import { createSelector } from '@reduxjs/toolkit';

const activeChannelIdSelector = createSelector(
  (state) => state.ui,
  (ui) => ui.activeChannelId,
);

export default activeChannelIdSelector;
