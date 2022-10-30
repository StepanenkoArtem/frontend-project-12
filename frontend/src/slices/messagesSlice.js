import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

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
  extraReducers: () => {},
});

export const { addMessage, addMessages } = messagesSlice.actions;

export { selectors, selectMessagesByChannelId };

export default messagesSlice.reducer;
