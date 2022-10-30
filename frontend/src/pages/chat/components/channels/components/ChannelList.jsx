import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Nav } from 'react-bootstrap';
import { useCurrentUser } from '../../../../../contexts/CurrentUser';

const ChannelList = () => {
  const channels = useSelector((state) => state.channels);
  const getChannelName = (id) => `# ${channels.entities[id].name}`;
  const { setActiveChannelId } = useCurrentUser();

  return (
    <Nav className="flex-column" as="ul">
      { channels.ids.map(
        (id) => (
          <Nav.Item key={id} className="nav-item w-100">
            <Button
              variant="light"
              className="w-100 rounded-0 text-start btn"
              onClick={() => setActiveChannelId(id)}
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
