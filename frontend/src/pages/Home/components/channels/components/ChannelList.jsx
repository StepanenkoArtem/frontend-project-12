import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setActiveChannelId, setRenamedChannelId, setDeletedChannelId } from '../../../../../store/ui/ui.slice';
import {
  activeChannelSelector,
  channelsSelector,
} from '../../../../../store/channels/channels.selectors';

const ChannelList = () => {
  const channels = useSelector(channelsSelector);
  const activeChannel = useSelector(activeChannelSelector);
  const { t } = useTranslation();

  const getChannelName = (id) => `#y${channels.entities[id].name}`;
  const dispatch = useDispatch();

  const setActive = (id) => {
    dispatch(setActiveChannelId(id));
  };

  const showRenameChannelModal = (id) => {
    dispatch(setRenamedChannelId(id));
  };

  const showDeleteChannelModal = (id) => {
    dispatch(setDeletedChannelId(id));
  };

  return (
    <div className="flex-grow-1">
      <Nav className="flex-column overflow-visible" as="ul">
        { channels.ids.map(
          (id) => {
            const isActive = id === activeChannel.id;
            const variant = isActive ? 'secondary' : '';
            const isRemovable = channels.entities[id].removable;
            return (
              <Nav.Item key={id} className="nav-item w-100">
                <Dropdown as={ButtonGroup} className="d-flex justify-content-between">
                  <Button
                    variant={variant}
                    className={`w-100 rounded-0 text-start btn text-truncate ${isActive && 'text-white'}`}
                    onClick={() => setActive(id)}
                  >
                    {getChannelName(id)}
                  </Button>

                  {isRemovable && (
                    <>
                      <Dropdown.Toggle split variant={variant} id="dropdown-split-basic">
                        <span className="visually-hidden">{t('channels.manageChannels')}</span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu variant={variant}>
                        <Dropdown.Item onClick={() => showRenameChannelModal(id)} key="renameChannel">
                          {t('channels.renameChannel')}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => showDeleteChannelModal(id)} key="removeChannel">
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
