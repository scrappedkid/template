import { applyMiddleware, compose, createStore } from 'redux'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'

import { fbConfig, rrfConfig, env } from '@global/config'
import rootReducer from '@global/controllers/reducers'

export default function configureStore () {
  const enhancers = []

  if (env === 'local') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension({ serialize: true, trace: true }))
    }
  }

  /**
*!     Middleware Configuration
**/

  const middleware = [
    thunk.withExtraArgument(getFirebase)
    // This is where you add other middleware like redux-observable
  ]

  /*
!       Firebase Initialization

    #          IMPORTANT NOTE!!!      #
?   This is changed in the newer
?   version of the firebase extension!
?   Instance initialization
?   works different in future version

TODO  http://docs.react-redux-firebase.com/history/v3.0.0/

!
*/

  //  firebase.initializeApp(fbConfig)
  firebase.firestore()
  firebase.functions()

  /**
*!     Store Instantiation and HMR Setup
**/

  const initialState = {}
  const history = createBrowserHistory()

  const store = createStore(
    rootReducer(history),
    initialState,
    compose(
      reactReduxFirebase(firebase, rrfConfig),
      reduxFirestore(firebase),
      applyMiddleware(routerMiddleware(history), ...middleware),
      ...enhancers
    )
  )

  store.asyncReducers = {}

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('@global/controllers/reducers', () => {
      const nextRootReducer = require('@global/controllers/reducers').default
      store.replaceReducer(nextRootReducer(history))
    })
  }
  return store
}
