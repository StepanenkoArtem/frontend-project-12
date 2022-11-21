import { createSelector } from '@reduxjs/toolkit';

const activeChannelIdSelector = createSelector(
  (state) => state.ui,
  (ui) => ui.activeChannelId,
);

const deletedChannelIdSelector = createSelector(
  (state) => state.ui,
  (ui) => ui.deletedChannelId,
);

const renamedChannelIdSelector = createSelector(
  (state) => state.ui,
  (ui) => ui.renamedChannelId,
);

const alertSelector = createSelector(
  (state) => state.ui,
  (ui) => ui.alert,
);

export {
  activeChannelIdSelector,
  deletedChannelIdSelector,
  renamedChannelIdSelector,
  alertSelector,
};
