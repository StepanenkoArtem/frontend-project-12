import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setRenamedChannelId, setDeletedChannelId } from '../../../../../store/ui/ui.slice';
import {
  channelsSelector, currentChannelSelector,
} from '../../../../../store/channels/channels.selectors';
import { setCurrentChannelId } from '../../../../../store/channels/channels.slice';

const ChannelList = () => {
  const channels = useSelector(channelsSelector);
  const currentChannel = useSelector(currentChannelSelector);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const showRenameChannelModal = (id) => {
    dispatch(setRenamedChannelId(id));
  };

  const showDeleteChannelModal = (id) => {
    dispatch(setDeletedChannelId(id));
  };

  return (
    <div className="flex-grow-1">
      <Nav className="flex-column overflow-visible" as="ul">
        { channels.map(
          (channel) => {
            const isActive = channel.id === currentChannel?.id;
            const variant = isActive ? 'secondary' : '';
            const isRemovable = channel.removable;
            return (
              <Nav.Item key={channel.id} className="nav-item w-100">
                <Dropdown as={ButtonGroup} className="d-flex justify-content-between">
                  <Button
                    variant={variant}
                    className={`w-100 rounded-0 text-start btn text-truncate ${isActive && 'text-white'}`}
                    onClick={() => dispatch(setCurrentChannelId(channel.id))}
                  >
                    {`# ${channel.name}`}
                  </Button>

                  {isRemovable && (
                    <>
                      <Dropdown.Toggle split variant={variant} id="dropdown-split-basic">
                        <span className="visually-hidden">{t('channels.manageChannels')}</span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu variant={variant}>
                        <Dropdown.Item onClick={() => showRenameChannelModal(channel.id)} key="renameChannel">
                          {t('channels.renameChannel')}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => showDeleteChannelModal(channel.id)} key="removeChannel">
                          {t('channels.removeChannel')}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </>
                  )}
                </Dropdown>
              </Nav.Item>
            );
          },
        )}
      </Nav>
    </div>
  );
};

export default ChannelList;
