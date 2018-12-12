import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import styles from './MainLayout.css'
import { menuData } from '../common/menuData'
import { Link } from 'dva/router'

const { Header, Content, Sider } = Layout

function MainLayout({ children, location }) {
  return (
    <Layout>
      <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
        <div className={styles.logo} ></div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
          {menuData.map(menu => (
            <Menu.Item key={menu.path}>
              <Link to={menu.path}>
                <Icon type={menu.icon} />
                <span className="nav-text">{menu.name}</span>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200, minHeight: '100vh', height: '100vh' }}>
        <Header style={{ background: '#fff', padding: '0 0 0 16px', fontSize: 24 }} > Wechat Helper </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ background: '#fff', padding: 24, overflow: 'hidden' }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
