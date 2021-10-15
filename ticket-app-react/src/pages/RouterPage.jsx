import React, { useContext } from 'react';

import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import { UiContext } from '../context/UiContext';

import EntryPage from './EntryPage';
import QueuePage from './QueuePage';
import CreateTicketPage from './CreateTicketPage';
import DesktopPage from './DesktopPage';

const { Sider, Content } = Layout;

const RouterPage = () => {
  const { isSidebarClose } = useContext(UiContext);

  return (
    <Router>
      <Layout style={{ height: '100vh' }}>
        <Sider collapsedWidth='0' breakpoint='md' hidden={isSidebarClose}>
          <div className='logo' />
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key='1' icon={<UserOutlined />}>
              <Link to='/entry'>Entry</Link>
            </Menu.Item>
            <Menu.Item key='2' icon={<VideoCameraOutlined />}>
              <Link to='/queue'>Queue</Link>
            </Menu.Item>
            <Menu.Item key='3' icon={<UploadOutlined />}>
              <Link to='/create'>Create Ticket</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className='site-layout'>
          <Content
            className='site-layout-background'
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}>
            <Switch>
              <Route path='/entry' component={EntryPage} />
              <Route path='/queue' component={QueuePage} />
              <Route path='/create' component={CreateTicketPage} />
              <Route path='/desktop' component={DesktopPage} />
              <Redirect to='/entry' />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default RouterPage;
