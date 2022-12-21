import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { initChat } from '../channels/channels.slice';

const messagesAdapter = createEntityAdapter();
const selectors = messagesAdapter.getSelectors((state) => state.messages);

const selectMessagesByChannelId = (channelId) => (state) => state
  .messages.ids
  .map((id) => state.messages.entities[id])
  .filter((message) => message.channelId === channelId);

/* eslint-disable no-param-reassign */
const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(initChat.pending, (state) => ({
        ...state,
        error: null,
        loadingStatus: 'loading',
      }))
      .addCase(initChat.rejected, (state, action) => ({
        ...state,
        error: action.payload,
        loadingStatus: 'failed',
      }))
      .addCase(initChat.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action.payload.messages);
        state.loadingStatus = 'idle';
        state.error = null;
      });
  },
});
/* eslint-enable no-param-reassign */
export const { addMessage } = messagesSlice.actions;

export { selectors, selectMessagesByChannelId };

export default messagesSlice.reducer;
