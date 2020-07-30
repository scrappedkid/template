import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import EmailListView from './components/EmailListView'
import EmailViewer from './components/EmailViewer'
import Menu from './components/Menu'
import './static/css/email.css'

class App extends Component {
  render () {
    return (
      <div id='layout' className='content pure-g'>
        <Menu />
        <Route path='/' component={EmailListView} exact />
        <Route path='/' component={EmailViewer} exact />
        <Route path='/list/:groupName' component={EmailListView} />
        <Route path='/list/:groupName' component={EmailViewer} exact />
        <Route path='/email/:emailId' component={EmailViewer} />
        <Route path='/email/:emailId' component={EmailListView} />
        <Route path='/list/:groupName/email/:emailId' component={EmailViewer} />
      </div>
    )
  }
}

export default App
