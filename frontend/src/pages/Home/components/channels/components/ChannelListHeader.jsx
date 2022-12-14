import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import PlusIcon from '../../../../../icons/PlusIcon';
import { showAddNewChannelModal } from '../../../../../store/modal/modal.slice';

const ChannelListHeader = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const addNewChannel = () => {
    dispatch(showAddNewChannelModal());
  };

  return (
    <div className="d-flex justify-content-between align-items-baseline mb-2 ps-4 pe-2">
      <p className="mt-2">{t('channels.header.title')}</p>
      <Button
        type="button"
        className="btn btn-group-vertical bg-light border-0 p-0"
        onClick={addNewChannel}
      >
        <PlusIcon className="text-primary" />
        <span className="visually-hidden">+</span>
      </Button>
    </div>
  );
};

export default ChannelListHeader;
