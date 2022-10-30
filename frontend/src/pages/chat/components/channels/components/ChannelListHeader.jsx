import React from 'react';
import { useTranslation } from 'react-i18next';
import PlusIcon from '../../../../../icons/PlusIcon';

const ChannelListHeader = () => {
  const { t } = useTranslation();
  const addNewChannel = () => {
    console.log('Add new channel');
  };
  return (
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
      <span>{t('channels.header.title')}</span>
      <PlusIcon
        className="text-primary"
        onClick={addNewChannel}
      />
    </div>
  );
};

export default ChannelListHeader;
