/* import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { browserHistory } from 'react-router'
import LoadingSpinner from '@assets/layout/LoadingSpinner' // change it to your custom component

const locationHelper = locationHelperBuilder({})

export const UserHasPermission = permission =>
  UserAuthWrapper({
    wrapperDisplayName: 'UserHasPermission',
    AuthenticatingComponent: LoadingSpinner,
    allowRedirectBack: false,
    redirectPath: (state, ownProps) =>
      locationHelper.getRedirectQueryParam(ownProps) || '/login',
    authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
      !auth.isLoaded || !profile.isLoaded || isInitializing === true,
    authenticatedSelector: ({ firebase: { auth } }) =>
      auth.isLoaded && !auth.isEmpty,
    redirectAction: newLoc => dispatch => {
      browserHistory.replace(newLoc) // or routerActions.replace
      dispatch({ type: UNAUTHED_REDIRECT })
    }
  })
 */
