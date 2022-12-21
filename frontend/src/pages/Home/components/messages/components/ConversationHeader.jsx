import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  selectMessagesByChannelId,
} from '../../../../../store/messages/messages.slice';
import {
  currentChannelSelector,
} from '../../../../../store/channels/channels.selectors';

const ConversationHeader = () => {
  const currentChannel = useSelector(currentChannelSelector);
  const messages = useSelector(selectMessagesByChannelId(currentChannel?.id));
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <h6 className="font-weight-bolder">{`# ${currentChannel?.name}`}</h6>
      {t('conversation.MessagesWithCount', { count: messages.length })}
    </div>
  );
};

export default ConversationHeader;
