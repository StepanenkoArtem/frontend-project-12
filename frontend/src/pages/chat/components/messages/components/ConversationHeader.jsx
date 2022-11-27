import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { activeChannelIdSelector } from '../../../../../store/ui/ui.selectors';
import { selectMessagesByChannelId } from '../../../../../store/messages/messages.slice';
import { selectors } from '../../../../../store/channels/channels.selectors';

const ConversationHeader = () => {
  const activeChannelId = useSelector(activeChannelIdSelector);
  const activeChannel = useSelector((state) => selectors.selectById(state, activeChannelId));
  const messages = useSelector((state) => selectMessagesByChannelId(state, activeChannelId));
  const { t } = useTranslation();
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <h6 className="font-weight-bolder">{`# ${activeChannel?.name}`}</h6>
      {t('conversation.MessagesWithCount', { count: messages.length })}
    </div>
  );
};

export default ConversationHeader;
