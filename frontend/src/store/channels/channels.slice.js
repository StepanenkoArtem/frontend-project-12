import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    deleteChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.upsertOne,
  },
});

export const {
  addChannels, addChannel, updateChannel, deleteChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
