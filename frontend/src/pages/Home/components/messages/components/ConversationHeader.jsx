import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  selectActiveChannelMessages,
} from '../../../../../store/messages/messages.slice';
import { activeChannelSelector } from '../../../../../store/channels/channels.selectors';

const ConversationHeader = () => {
  const activeChannel = useSelector(activeChannelSelector);
  const messages = useSelector(selectActiveChannelMessages);
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <h6 className="font-weight-bolder">{`# *${activeChannel?.name}`}</h6>
      {t('conversation.MessagesWithCount', { count: messages.length })}
    </div>
  );
};

export default ConversationHeader;
