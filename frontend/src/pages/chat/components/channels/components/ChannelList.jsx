import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Nav } from 'react-bootstrap';
import { setActiveChannelId } from '../../../../../store/ui/ui.slice';
import activeChannelIdSelector from '../../../../../store/ui/ui.selectors';

const ChannelList = () => {
  const channels = useSelector((state) => state.channels);
  const activeChannelId = useSelector(activeChannelIdSelector);
  const getChannelName = (id) => `# ${channels.entities[id].name}`;
  const dispatch = useDispatch();

  return (
    <Nav className="flex-column" as="ul">
      { channels.ids.map(
        (id) => (
          <Nav.Item key={id} className="nav-item w-100 bg-danger">
            <Button
              variant="light"
              className={`w-100 rounded-0 text-start btn ${activeChannelId === id && 'bg-secondary text-white'}`}
              onClick={() => dispatch(setActiveChannelId(id))}
            >
              {getChannelName(id)}
            </Button>
          </Nav.Item>
        ),
      )}
    </Nav>
  );
};

export default ChannelList;
