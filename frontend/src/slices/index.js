import { configureStore } from '@reduxjs/toolkit';
import channelReducer from '../slices/channelSlice.js';
import messageReducer from '../slices/messageSlice.js';

export default configureStore({
  reducer: {
    channels: counterReducer,
    messages: messageReducer,
  },
});

