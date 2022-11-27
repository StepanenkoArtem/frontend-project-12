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

export const removeChannel = createAsyncThunk(
  'channels/remove',
  async ({ deletedChannelId, socket }) => {
    await socket.emit(
      'removeChannel',
      { id: deletedChannelId },
    );
  },
);

export const renameChannel = createAsyncThunk(
  'channels/rename',
  async ({ channelName, channelId, socket }) => {
    await socket.emit(
      'renameChannel',
      { name: channelName, id: channelId },
    );
  },
);

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
  extraReducers: (builder) => {
    builder
      .addCase(createNewChannel.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(createNewChannel.rejected, (state, action) => {
        console.log(action.error);
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(createNewChannel.fulfilled, (state) => {
        state.loadingStatus = 'success';
        state.error = null;
      });

    builder
      .addCase(removeChannel.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(removeChannel.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(removeChannel.fulfilled, (state) => {
        state.loadingStatus = 'success';
        state.error = null;
      });

    builder
      .addCase(renameChannel.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(renameChannel.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(renameChannel.fulfilled, (state) => {
        state.loadingStatus = 'success';
        state.error = null;
      });
  },
});

export const {
  addChannels, addChannel, updateChannel, deleteChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
