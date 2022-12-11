import React from 'react';
import { useSelector } from 'react-redux';

import currentModalSelector from '../store/modal/modal.selectors';

import AddNewChannelModal from '../modals/AddNewChannelModal';
import RenameChannelModal from '../modals/RenameChannelModal';
import DeleteChannelModal from '../modals/DeleteChannelModal';

const ModalWindow = () => {
  const currentModal = useSelector(currentModalSelector);

  const modalType = {
    addNewChannel: <AddNewChannelModal show />,
    renameChannel: <RenameChannelModal show />,
    deleteChannel: <DeleteChannelModal />,
  };

  return modalType[currentModal];
};

export default ModalWindow;
