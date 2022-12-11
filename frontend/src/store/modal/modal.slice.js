import { createSlice } from '@reduxjs/toolkit';
import { setDeletedChannelId, setRenamedChannelId } from '../ui/ui.slice';

/* eslint-disable no-param-reassign */
const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: null,
  },
  reducers: {
    showAddNewChannelModal: (state) => ({
      ...state,
      type: 'addNewChannel',
    }),
    closeModal: (state) => ({
      ...state,
      type: null,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(setRenamedChannelId, (state) => ({
        ...state,
        type: 'renameChannel',
      }))
      .addCase(setDeletedChannelId, (state) => ({
        ...state,
        type: 'deleteChannel',
      }));
  },
});
/* eslint-enable no-param-reassign */

export const {
  showAddNewChannelModal,
  closeModal,
} = modalSlice.actions;

export default modalSlice.reducer;
