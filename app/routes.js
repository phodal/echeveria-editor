import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import WechatPage from './containers/WechatPage';

export default (
  <Route name="app" path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="/wechat" component={WechatPage}/>
  </Route>
);
