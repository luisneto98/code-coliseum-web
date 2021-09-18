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
import { Image, Layout } from 'antd'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <Header>
        </Header>
        <Content>
          <App />
        </Content>
        <Footer />
      </Layout>
    </ConnectedRouter>
  </Provider>,
  target
)
