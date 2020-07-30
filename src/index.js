import { ConnectedRouter } from 'connected-react-router'
import { Provider, ReactReduxContext, connect } from 'react-redux'
import Firebase, { FirebaseContext } from '@global/controllers/middleware/firebase'
import ReactDOM from 'react-dom'

import * as serviceWorker from './serviceworker'
import dashApp from '@global/dashapp.js'

// import './semantic/semantic.less'

/* eslint-disable import/order */
import React from 'react'
import configureStore from '@global/controllers/store/configurestore'
import { createBrowserHistory } from 'history'
import { env } from '@global/config'
import { version } from '../package.json'
import { withAuthentication } from '@utils/Session'

import 'antd/dist/antd.css'

window.version = version
window.env = env

const initialState = window.___INITIAL_STATE__ || {
  firebase: { authError: null }
}

const history = createBrowserHistory()
const store = configureStore(initialState)

const compile = Component => {
  ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
      <Provider store={store} context={ReactReduxContext}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    </FirebaseContext.Provider>,
    document.getElementById('root')
  )
}

compile(connect(withAuthentication)(dashApp, history))

if (module.hot) {
  module.hot.accept('./', () => {
    compile(dashApp)
  })
}

/*

!   If you want your dashApp to work offline and load faster, you can change
!   unregister() to register() below.Note this comes with some pitfalls.
!   service workers: http://bit.ly/CRA-PWA=

*/

serviceWorker.register()
