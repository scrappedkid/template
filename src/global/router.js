import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { connect } from 'react-redux'
import App from '@client'
import asyncComponent from '@global/helpers/asyncfunc'
import Auth0 from '@global/authentication/auth0'

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
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
          component={asyncComponent(() => import('@global/containers/core/page/signin'))}
        />
        <Route
          exact
          path='/404'
          component={asyncComponent(() => import('@global/containers/core/page/404'))}
        />
        <Route
          exact
          path='/500'
          component={asyncComponent(() => import('@global/containers/core/page/500'))}
        />
        <Route
          exact
          path='/signin'
          component={asyncComponent(() => import('@global/containers/core/page/signin'))}
        />
        <Route
          exact
          path='/signup'
          component={asyncComponent(() => import('@global/containers/core/page/signup'))}
        />
        <Route
          exact
          path='/forgotpassword'
          component={asyncComponent(() =>
            import('@global/containers/core/page/forgotpassword')
          )}
        />
        <Route
          exact
          path='/resetpassword'
          component={asyncComponent(() =>
            import('@global/containers/core/page/resetpassword')
          )}
        />

        <Route
          path='/auth0loginCallback'
          render={props => {
            Auth0.handleAuthentication(props)
          }}
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
