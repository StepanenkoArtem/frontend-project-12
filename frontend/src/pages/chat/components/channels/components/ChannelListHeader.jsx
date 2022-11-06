import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import PlusIcon from '../../../../../icons/PlusIcon';
import AddNewChannelModal from './AddNewChannelModal';

const ChannelListHeader = () => {
  const { t } = useTranslation();

  const [isAddNewChannelModalEnabled, showAddNewChannelModal] = useState(false);

  const addNewChannel = () => {
    showAddNewChannelModal(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <p>{t('channels.header.title')}</p>
        <Button type="button" className="btn btn-group-vertical bg-light border-0" onClick={addNewChannel}>
          <PlusIcon className="text-primary" />
        </Button>
      </div>
      <AddNewChannelModal
        show={isAddNewChannelModalEnabled}
        closeModal={() => showAddNewChannelModal(false)}
      />
    </>
  );
};

export default ChannelListHeader;
