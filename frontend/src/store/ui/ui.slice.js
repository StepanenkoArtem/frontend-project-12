import { createSlice } from '@reduxjs/toolkit';
import {
  addChannel, deleteChannel, updateChannel,
} from '../channels/channels.slice';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { activeChannelId: 1 },
  reducers: {
    setActiveChannelId: (state, action) => {
      state.activeChannelId = action.payload;
    },
    setDeletedChannelId: (state, action) => {
      state.deletedChannelId = action.payload;
    },
    setRenamedChannelId: (state, action) => {
      state.renamedChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addChannel, (state, action) => {
        state.activeChannelId = action.payload.id;
      })
      .addCase(updateChannel, (state) => {
        state.renamedChannelId = null;
      })
      .addCase(deleteChannel, (state) => {
        state.deletedChannelId = null;
      });
  },
});

export const {
  setActiveChannelId, setDeletedChannelId, setRenamedChannelId,
} = uiSlice.actions;

export default uiSlice.reducer;
