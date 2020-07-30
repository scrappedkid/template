import React, { Component } from 'react'
import { connect } from 'react-redux'
import DesktopView from './desktopview'
import MobileView from './mobileview'
import TabView from './tabview'

class Mail extends Component {
  render () {
    const { view, height } = this.props
    const MailView =
      view === 'DesktopView'
        ? DesktopView
        : view === 'TabView' ? TabView : MobileView
    return (
      <div style={{ height: '100%' }}>
        <MailView height={height} />
      </div>
    )
  }
}
export default connect(state => ({
  ...state.App
}))(Mail)
