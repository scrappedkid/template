import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { connect } from 'react-redux'

import App from '@client'
import asyncComponent from '@global/helpers/asyncfunc'

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => isLoggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/signin',
          state: { from: props.location }
        }}
      />
    )}
  />
)
const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route
          exact
          path='/'
          component={asyncComponent(() => import('@global/containers/core/page/signin')
          )}
        />
        <Route
          exact
          path='/signin'
          component={asyncComponent(() => import('@global/containers/core/page/signin')
          )}
        />
        <RestrictedRoute
          path='/dashboard'
          component={App}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </ConnectedRouter>
  )
}

export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null
}))(PublicRoutes)
