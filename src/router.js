import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import IndexPage from './routes/IndexPage'
import MainLayout from './components/MainLayout'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <MainLayout>
          <Route path='/' exact component={IndexPage} />
        </MainLayout>
      </Switch>
    </Router>
  )
}

export default RouterConfig
