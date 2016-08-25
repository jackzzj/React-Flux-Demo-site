import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../public/assets/main.css';

import ReactDOM from 'react-dom';
import React from 'react';


import {hashHistory, Router, Route, Redirect} from 'react-router';

import Navbar from './layout/navbar'
import IndexPage from './pages/index'
import CoffeePage from './pages/coffee'
import OriginPage from './pages/origin'
import SubscriptionPage from './pages/subscription'
import NoMatch from './pages/no-match'

const app = (
  <Router history={hashHistory}>
    <Redirect from="/" to="/index"/>
    <Route path="/" component={Navbar}>
      <Route path="/index" component={IndexPage}/>
      <Route path="/coffee/:coffeeId" component={CoffeePage}/>
      <Route path="/origin/:originId" component={OriginPage}/>
      <Route path="/subscription/:coffeeId" component={SubscriptionPage}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
)

ReactDOM.render(app, document.getElementById('coffee-shop'));
