import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import ApiPaths from '../../config/ApiPaths';

export const initChat = createAsyncThunk(
  'channels/fetchInitialData',
  async (apiClient) => {
    const { data } = await apiClient.get(ApiPaths.data);
    return data;
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
      .addCase(initChat.pending, (state) => ({
        ...state,
        loadingStatus: 'loading',
        error: null,
      }))
      .addCase(initChat.rejected, (state, action) => ({
        ...state,
        loadingStatus: 'failed',
        error: action.payload,
      }))
      .addCase(initChat.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
        state.loadingStatus = 'idle';
        state.error = null;
      });
  },
});

export const {
  addChannel, updateChannel, deleteChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
