import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import { setActiveChannelId } from '../../../../../store/ui/ui.slice';
import activeChannelIdSelector from '../../../../../store/ui/ui.selectors';

const ChannelList = () => {
  const channels = useSelector((state) => state.channels);
  const activeChannelId = useSelector(activeChannelIdSelector);
  const getChannelName = (id) => `# ${channels.entities[id].name}`;
  const dispatch = useDispatch();

  const setActive = (id) => {
    dispatch(setActiveChannelId(id));
  };

  const renameChannel = () => {};

  const deleteChannel = () => {};

  return (
    <Nav className="flex-column" as="ul">
      { channels.ids.map(
        (id) => {
          const isActive = id === activeChannelId;
          const variant = isActive ? 'secondary' : '';
          const isRemovable = channels.entities[id].removable;
          return (
            <Nav.Item key={id} className="nav-item w-100">
              <Dropdown as={ButtonGroup} className="d-flex justify-content-between">
                <Button
                  variant={variant}
                  className={`w-100 rounded-0 text-start btn ${isActive && 'text-white'}`}
                  onClick={() => setActive(id)}
                >
                  {getChannelName(id)}
                </Button>

                {isRemovable && (
                <>
                  <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" />

                  <Dropdown.Menu variant={variant}>
                    <Dropdown.Item onClick={renameChannel}>Rename channel</Dropdown.Item>
                    <Dropdown.Item onClick={deleteChannel}>Delete channel</Dropdown.Item>
                  </Dropdown.Menu>
                </>
                )}
              </Dropdown>
            </Nav.Item>
          );
        },
      )}
    </Nav>
  );
};

export default ChannelList;
