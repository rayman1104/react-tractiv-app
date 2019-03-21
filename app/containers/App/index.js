/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainPage from 'containers/MainPage/Loadable';
import SchedulePage from 'containers/SchedulePage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import 'resources/style.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function App() {
  return (
    <Route
      render={({ location }) => {
        const { pathname } = location;
        return (
          <TransitionGroup>
            <CSSTransition
              key={pathname}
              classNames="page"
              timeout={{
                enter: 0,
                exit: 500,
              }}
            >
              <Route
                location={location}
                render={() => (
                  <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route path="/schedule" component={SchedulePage} />
                    <Route component={NotFoundPage} />
                  </Switch>
                )}
              />
            </CSSTransition>
          </TransitionGroup>
        );
      }}
    />
  );
}
