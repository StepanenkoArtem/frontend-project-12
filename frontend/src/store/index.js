import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels/channels.slice';
import messagesReducer from './messages/messages.slice';
import uiReducer from './ui/ui.slice';
import modalReducer from './modal/modal.slice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    ui: uiReducer,
    modal: modalReducer,
  },
});
