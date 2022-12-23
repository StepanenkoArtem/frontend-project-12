import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import ApiPaths from '../../config/ApiPaths';

export const initChat = createAsyncThunk(
  'channels/fetchInitialData',
  async (apiClient, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get(ApiPaths.data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const channelsAdapter = createEntityAdapter();

/* eslint-disable no-param-reassign */
const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    loadingStatus: 'idle',
    error: null,
    defaultChannelId: null,
    currentChannelId: null,
  }),
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    deleteChannel: (state, action) => {
      const deletedChannelId = action.payload;
      channelsAdapter.removeOne(state, deletedChannelId);
      if (deletedChannelId === state.currentChannelId) {
        state.currentChannelId = state.defaultChannelId;
      }
    },
    updateChannel: channelsAdapter.upsertOne,
    setCurrentChannelId: (state, action) => ({
      ...state,
      currentChannelId: action.payload,
    }),
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
        state.defaultChannelId = action.payload.currentChannelId;
        state.currentChannelId = action.payload.currentChannelId;
        state.loadingStatus = 'idle';
        state.error = null;
      });
  },
});
/* eslint-enable no-param-reassign */

export const {
  addChannel, updateChannel, deleteChannel, setCurrentChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
