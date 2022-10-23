import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import ApiPaths from '../config/ApiPaths';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (client) => {
    const response = await client.get(ApiPaths.data);
    return response.data.channels;
  },
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
  reducers: {
    addChannels: (state, action) => {
      state.channels.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { addChannels } = channelsSlice.actions;

export default channelsSlice.reducer;
