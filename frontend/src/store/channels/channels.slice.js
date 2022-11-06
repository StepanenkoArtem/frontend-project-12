import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

export const createNewChannel = createAsyncThunk(
  'channels/createNew',
  async ({ channelName, socket }) => {
    await socket.emit(
      'newChannel',
      { name: channelName },
    );
  },
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    updateChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewChannel.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(createNewChannel.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const {
  addChannels, addChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
