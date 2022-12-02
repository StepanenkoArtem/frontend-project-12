import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { initChat } from '../channels/channels.slice';

const messagesAdapter = createEntityAdapter();
const selectors = messagesAdapter.getSelectors((state) => state.messages);

const selectMessagesByChannelId = createSelector(
  (state) => selectors.selectAll(state),
  (_, channelId) => channelId,
  (messages, channelId) => messages
    .filter((message) => message.channelId === channelId),
);

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
        state.error = null;
        state.loadingStatus = 'idle';
      });
  },
});

export const { addMessage, addMessages } = messagesSlice.actions;

export { selectors, selectMessagesByChannelId };

export default messagesSlice.reducer;
