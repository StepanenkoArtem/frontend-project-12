import { createSlice } from '@reduxjs/toolkit';
import {
  createNewChannel,
  removeChannel,
  renameChannel,
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
    setActiveChannelId: (state, action) => {
      state.activeChannelId = action.payload;
    },
    setDeletedChannelId: (state, action) => {
      state.deletedChannelId = action.payload;
    },
    setRenamedChannelId: (state, action) => {
      state.renamedChannelId = action.payload;
    },
    setAlert: (state, action) => {
      state.alert.message = action.payload.message;
      state.alert.type = action.payload.type;
    },
    removeAlert: (state) => {
      state.alert.message = null;
      state.alert.type = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel.fulfilled, (state) => {
        state.alert.type = ALERT_TYPES.SUCCESS;
        state.alert.message = 'alerts.channelWasRemoved';
      })
      .addCase(removeChannel.rejected, (state, action) => {
        state.alert.type = ALERT_TYPES.ERROR;
        state.alert.message = action.payload.error.message;
      })
      .addCase(renameChannel.fulfilled, (state) => {
        state.alert.type = ALERT_TYPES.SUCCESS;
        state.alert.message = 'alerts.channelWasRenamed';
      })
      .addCase(createNewChannel.fulfilled, (state) => {
        state.alert.type = ALERT_TYPES.SUCCESS;
        state.alert.message = 'alerts.channelWasCreated';
      })
      .addCase(createNewChannel.rejected, (state, action) => {
        state.alert.type = ALERT_TYPES.ERROR;
        state.alert.message = action.payload;
      });
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
