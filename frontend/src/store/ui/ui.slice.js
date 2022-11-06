import { createSlice } from '@reduxjs/toolkit';
import { addChannel } from '../channels/channels.slice';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { activeChannelId: 1 },
  reducers: {
    setActiveChannelId: (state, action) => {
      state.activeChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addChannel, (state, action) => {
        state.activeChannelId = action.payload.id;
      });
  },
});

export const {
  setActiveChannelId,
} = uiSlice.actions;

export default uiSlice.reducer;
