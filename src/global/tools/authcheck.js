import { BrowserHistory } from 'react-router'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import createHistory from 'history/createBrowserHistory'
import LoadingSpinner from 'assets/LoadingSpinner'

const locationHelper = locationHelperBuilder({})

const history = createHistory()

export const UserIsAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsAuthenticated',
  AuthenticatingComponent: LoadingSpinner,
  allowRedirectBack: true,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/login',
  authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && !auth.isEmpty,
  redirectAction: newLoc => dispatch => {
    BrowserHistory.replace(newLoc)
    dispatch({ type: process.env.UNAUTHED_REDIRECT })
  }
})

export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  AuthenticatingComponent: LoadingSpinner,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && auth.isEmpty,
  redirectAction: newLoc => dispatch => {
    BrowserHistory.replace(newLoc)
    dispatch({ type: process.env.UNAUTHED_REDIRECT })
  }
})

const locationHelper = locationHelperBuilder({})

export const UserHasPermission = permission =>
  UserAuthWrapper({
    wrapperDisplayName: 'UserHasPermission',
    AuthenticatingComponent: LoadingSpinner,
    allowRedirectBack: false,
    redirectPath: (state, ownProps) =>
      locationHelper.getRedirectQueryParam(ownProps) || '/login',
    authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
      !auth.isLoaded || !auth.profile.isLoaded || isInitializing === true,
    authenticatedSelector: ({ firebase: { auth } }) =>
      auth.isLoaded && !auth.isEmpty,
    redirectAction: newLoc => dispatch => {
      BrowserHistory.replace(newLoc)
      dispatch({ type: process.env.UNAUTHED_REDIRECT })
    }
  })
