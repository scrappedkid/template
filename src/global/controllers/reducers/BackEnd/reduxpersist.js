import 'firebase/database'
import 'firebase/auth'
import { firebase } from 'firebase/app'

import { BrowserHistory } from 'connected-react-router'
import { reactReduxFirebase } from 'react-redux-firebase'
import { compose, createStore } from 'redux'
import { localStorage, persistReducer, persistStore } from 'redux-persist'

import { Firebase, firebaseConfig, reduxConfig } from '@global/controllers/middleware/firebase'
import { makeRootReducer } from '! DEV Resources/projects from Open Source/react-redux-firebase-boiler/store/node_modules/@reducers/reducers'

const persistConfig = {
  key: 'root',
  storage: localStorage
}

BrowserHistory = History

export default persistore = (initialState = {}, BrowserHistory) => {
  // Initialize firebase instance
  Firebase.initializeApp(options.firebaseConfig)

  const persistedReducer = persistReducer(makeRootReducer, persistConfig)

  const store = createStore(
    persistedReducer,
    initialState,
    compose(reactReduxFirebase(firebase, reduxConfig))
  )

  const persistore = persistStore(store)

  return {
    persistore
  }
}
