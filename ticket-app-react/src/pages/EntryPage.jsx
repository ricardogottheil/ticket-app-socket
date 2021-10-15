import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import useHideSidebar from '../hooks/useHideSidebar';
import { getUserStorage } from '../helpers/getUserStorage';

const { Title, Text } = Typography;

const EntryPage = () => {
  useHideSidebar(false);
  const history = useHistory();

  const [user] = useState(getUserStorage());
  // console.log(user);

  const onFinish = ({ agent, desktop }) => {
    // console.log('Success:', values);

    localStorage.setItem('agent', agent);
    localStorage.setItem('desktop', desktop);

    history.push('/desktop');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (user.agent && user.desktop) {
    return <Redirect to='/desktop' />;
  }

  return (
    <>
      <Title level={2}>Entry</Title>
      <Text>Entry your name and desktop number</Text>
      <Divider />
      <Form
        name='basic'
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        <Form.Item
          label='Agent name'
          name='agent'
          rules={[
            {
              required: true,
              message: 'Please input your agent name',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Desktop'
          name='desktop'
          rules={[
            {
              required: true,
              message: 'Please input your desktop',
            },
          ]}>
          <InputNumber min={1} max={100} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 14,
          }}>
          <Button type='primary' htmlType='submit' shape='round'>
            <SaveOutlined /> Entry
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EntryPage;
