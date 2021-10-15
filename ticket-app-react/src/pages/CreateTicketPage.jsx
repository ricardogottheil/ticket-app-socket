import React, { useContext, useState } from 'react';
import { Row, Col, Typography, Button } from 'antd';

import { DownloadOutlined } from '@ant-design/icons';
import useHideSidebar from '../hooks/useHideSidebar';
import { SocketContext } from '../context/SocketContext';

const { Title, Text } = Typography;

const CreateTicketPage = () => {
  useHideSidebar(true);

  const { socket } = useContext(SocketContext);
  const [lastTicket, setLastTicket] = useState(null);

  const handleNewTicket = () => {
    socket.emit('request-ticket', null, (ticket) => {
      setLastTicket(ticket);
    });
  };

  return (
    <>
      <Row>
        <Col span={14} offset={6} align='center'>
          <Title level={3}>Press button to get new ticket</Title>
          <Button
            type='primary'
            shape='round'
            icon={<DownloadOutlined />}
            size='large'
            onClick={handleNewTicket}>
            New Ticket
          </Button>
        </Col>
      </Row>
      {lastTicket && (
        <Row style={{ marginTop: '100px' }}>
          <Col span={14} offset={6} align='center'>
            <Text level={2}>Your number is:</Text>
            <br />
            <Text type='success' style={{ fontSize: 55 }}>
              {lastTicket.number}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CreateTicketPage;
