import React        from 'react';
import {
  Route,
  IndexRoute
}                   from 'react-router';
import { App }      from '../containers';
import {
  Home,
  About,
  Components,
  Opendata
}                   from '../views';

const Routes = () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Opendata} />
      <Route path="/aliments" component={Opendata} />
    </Route>
  );
};

export default Routes;
