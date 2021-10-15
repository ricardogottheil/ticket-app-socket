import React, { useContext, useState, useEffect } from 'react';
import { Typography, Row, Col, List, Card, Tag, Divider } from 'antd';
import useHideSidebar from '../hooks/useHideSidebar';
import { SocketContext } from '../context/SocketContext';
import { getLastTickets } from '../helpers/getLastTickets';

const { Title, Text } = Typography;

const QueuePage = () => {
  useHideSidebar(true);

  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    socket.on('last-ticket-assigned', (payload) => {
      console.log(payload);
      setTickets(payload);
    });

    return () => {
      socket.off('last-ticket-assigned');
    };
  }, [socket]);

  useEffect(() => {
    getLastTickets()
      .then((data) => {
        setTickets(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Title level={1}>Attending client</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                <Card
                  style={{ width: '80%', marginTop: 16 }}
                  actions={[
                    <Tag color='volcano'>{item.agent}</Tag>,
                    <Tag color='magenta'>Desktop: {item.desktop}</Tag>,
                  ]}>
                  <Title level={4}>Ticket No. {item.number}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider>Tickets history</Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket No. ${item.number}`}
                  description={
                    <>
                      <Text type='secondary'>In desktop: </Text>
                      <Tag color='magenta'>{item.desktop}</Tag>
                      <Text type='secondary'>Agent: </Text>
                      <Tag color='volcano'>{item.agent}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default QueuePage;
