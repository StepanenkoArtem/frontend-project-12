import { createSelector } from '@reduxjs/toolkit';

const currentModalSelector = createSelector(
  (state) => state.modal,
  (modal) => modal.type,
);

export default currentModalSelector;
