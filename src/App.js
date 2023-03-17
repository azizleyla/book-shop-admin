import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Route, Router, Routes } from 'react-router-dom';
import Products from './components/products/ProductTable';
import { useState } from 'react';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusOutlined
} from "@ant-design/icons"
import ProductTable from './components/products/ProductTable';
import ProductsForm from './components/products/ProductForm';
import ProductForm from './components/products/ProductForm';


const { Sider, Content, Header } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className="app">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}

          >
            <Menu.Item key="1">
              <span>Məhsullar</span>
              <Link to="/products" />
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Routes>

              <Route path="/products" element={<ProductTable />} />
              <Route path="/products/add" element={<ProductForm />} />
              <Route path="/products/edit/:id" element={<ProductForm />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
