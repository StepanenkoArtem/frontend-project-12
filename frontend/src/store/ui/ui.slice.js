import { createSlice } from '@reduxjs/toolkit';
import {
  addChannel, deleteChannel, initChat, updateChannel,
} from '../channels/channels.slice';
import { ALERT_TYPES } from '../../config/constants';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeChannelId: 1,
    alert: {
      type: '',
      message: '',
    },
  },
  reducers: {
    setActiveChannelId: (state, action) => ({
      ...state,
      activeChannelId: action.payload,
    }),
    setDeletedChannelId: (state, action) => ({
      ...state,
      deletedChannelId: action.payload,
    }),
    setRenamedChannelId: (state, action) => ({
      ...state,
      renamedChannelId: action.payload,
    }),
    setAlert: (state, action) => ({
      ...state,
      alert: { message: action.payload.message, type: action.payload.type },
    }),
    removeAlert: (state) => ({
      ...state,
      alert: { message: null, type: null },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteChannel, (state) => ({
        ...state,
        activeChannelId: 1,
        alert: { type: ALERT_TYPES.SUCCESS, message: 'alerts.channelWasRemoved' },
      }))
      .addCase(updateChannel, (state) => ({
        ...state,
        alert: { type: ALERT_TYPES.SUCCESS, message: 'alerts.channelWasRenamed' },
      }))
      .addCase(addChannel, (state, action) => ({
        ...state,
        activeChannelId: action.payload.id,
        alert: { type: ALERT_TYPES.SUCCESS, message: 'alerts.channelWasCreated' },
      }));

    builder
      .addCase(initChat.rejected, (state, action) => ({
        ...state,
        alert: { type: ALERT_TYPES.ERROR, message: `error.${action.error.code}` },
      }));
  },
});

export const {
  setActiveChannelId,
  setDeletedChannelId,
  setRenamedChannelId,
  setAlert,
  removeAlert,
} = uiSlice.actions;

export default uiSlice.reducer;
