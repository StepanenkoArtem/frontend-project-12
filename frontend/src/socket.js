import store from './store';
import { addMessage } from './store/messages/messages.slice';
import { addChannel, deleteChannel, updateChannel } from './store/channels/channels.slice';
import { setAlert } from './store/ui/ui.slice';
import { ALERT_TYPES } from './config/constants';

const subscribe = (socketInstance) => {
  socketInstance.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });

  socketInstance.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });

  socketInstance.on('removeChannel', ({ id }) => {
    store.dispatch(deleteChannel(id));
  });

  socketInstance.on('renameChannel', (channel) => {
    store.dispatch(updateChannel(channel));
  });

  socketInstance.on('connect_error', (reason) => {
    store.dispatch(setAlert({ type: ALERT_TYPES.ERROR, message: reason }));
  });

  const createNewChannel = async (channelName) => {
    await socketInstance.emit('newChannel', { name: channelName });
  };

  const sendNewMessage = async (message, channelId, username) => {
    await socketInstance.emit('newMessage', { body: message, channelId, username });
  };

  const removeChannel = async (channelId) => {
    await socketInstance.emit('removeChannel', { id: channelId });
  };

  const renameChannel = async (channelName, channelId) => {
    await socketInstance.emit('renameChannel', { name: channelName, id: channelId });
  };

  return {
    createNewChannel,
    sendNewMessage,
    removeChannel,
    renameChannel,
  };
};

export default subscribe;
