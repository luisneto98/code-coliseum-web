import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import App from './containers/app'
import 'antd/dist/antd.css';

import 'sanitize.css/sanitize.css'
import './index.css'
import { Content, Footer, Header } from 'antd/lib/layout/layout'
import { Image, Layout, Row, Typography } from 'antd'

const { Title } = Typography;

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Row align='middle' style={{ height: '100%' }}>
            <Title level={1} style={{ color: 'white', fontFamily: 'Montserrat', fontWeight: 800, marginBottom: 0, marginTop: 0 }}> Code Colisium </Title>
          </Row>
        </Header>
        <Content style={{ display: 'flex', flex: 1 }}>
          <App />
        </Content>
        <Footer />
      </Layout>
    </ConnectedRouter>
  </Provider>,
  target
)
