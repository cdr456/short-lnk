import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import {isAuthenticated} from '../../client/main';

const history = createBrowserHistory()

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

export const onAuthChange = (isAuthenticated) => {
    const pathname = this.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    console.log(pathname + ' ' + isAuthenticated);

    if (isUnauthenticatedPage && isAuthenticated) {
        history.replace('/links');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        history.replace('/');
    };
}


export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={() => (
        isAuthenticated ? (
          <Redirect to="/links" />
        ) : (
          <Login />
        )
      )} />
      <Route path="/signup" render={() => (
        isAuthenticated ? (
          <Redirect to="/links" />
        ) : (
          <Signup />
        )
      )} />
      <Route path="/links" render={() => (
        !isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <Link />
        )
      )} />
      <Route path="*" component={NotFound}/>
    </Switch>
  </Router>
);