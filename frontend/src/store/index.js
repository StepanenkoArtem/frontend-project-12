import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels/channels.slice';
import messagesReducer from './messages/messages.slice.js';
import uiReducer from './ui/ui.slice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    ui: uiReducer,
  },
});
