import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
// import { reducer as form } from 'redux-form'
import { firebaseStateReducer } from 'react-redux-firebase'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { sessionReducer } from './frontend/authReducer/session'
import { userReducer } from './frontend/authReducer/user'
import messageReducer from './frontend/authReducer/message'

const history = createBrowserHistory()

export function rootReducer (asyncReducers) {
  return combineReducers({
    // Add sync reducers here
    sessionState: sessionReducer,
    messageState: messageReducer,
    router: connectRouter(history),
    userState: userReducer,
    firebase: firebaseStateReducer,
    firestore: firestoreReducer
  })
}

export function injectReducer (store, { key, reducer }) {
  store.asyncReducers[key] = reducer
  store.replaceReducer(rootReducer(store.asyncReducers))
}

export default rootReducer
