import React, { useContext, useState } from 'react';
import { Row, Col, Typography, Button, Divider } from 'antd';
import { CloseOutlined, ArrowRightOutlined } from '@ant-design/icons';
import useHideSidebar from '../hooks/useHideSidebar';
import { getUserStorage } from '../helpers/getUserStorage';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';

const { Title, Text } = Typography;

const DesktopPage = () => {
  const history = useHistory();
  const { socket } = useContext(SocketContext);
  const [user] = useState(getUserStorage());
  const [ticketAssigned, setTicketAssigned] = useState(null);
  useHideSidebar(false);

  const handleQuit = () => {
    localStorage.clear();
    // localStorage.removeItem('agent');
    // localStorage.removeItem('desktop');
    history.replace('/entry');
  };

  const handleNextTicket = () => {
    socket.emit('next-ticket-attend', user, (ticket) => {
      setTicketAssigned(ticket);
    });
  };

  if (!user.agent || !user.desktop) {
    return <Redirect to='/entry' />;
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{user.agent}</Title>
          <Text>You are working in desktop: </Text>
          <Text type='success'>{user.desktop}</Text>
        </Col>
        <Col span={4} align='right'>
          <Button shape='round' type='danger' onClick={handleQuit}>
            <CloseOutlined />
            Quit
          </Button>
        </Col>
      </Row>
      <Divider />
      {ticketAssigned && (
        <Row>
          <Col>
            <Text>You are attending the ticket: </Text>
            <Text style={{ fontSize: 30 }} type='danger'>
              {ticketAssigned.number}
            </Text>
          </Col>
        </Row>
      )}

      {!ticketAssigned && (
        <Row>
          <Col>
            <Text style={{ fontSize: 30 }} type='danger'>
              No tickets
            </Text>
          </Col>
        </Row>
      )}

      <Row>
        <Col offset={18} span={6} align='right'>
          <Button onClick={handleNextTicket} shape='round' type='primary'>
            <ArrowRightOutlined />
            Next Ticket
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default DesktopPage;
