import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import ApiPaths from '../config/ApiPaths';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (client) => {
    const response = await client.get(ApiPaths.data);
    return response.data.messages;
  },
);

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { addMessage } = messagesSlice.actions;
const selectors = messagesAdapter.getSelectors((state) => state.messages);
export { selectors };

export default messagesSlice.reducer;
