import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, LocaleProvider } from 'antd'
import { IntlProvider } from 'react-intl'
import { Debounce } from 'react-throttle'
import WindowResizeListener from 'react-window-size-listener'
import { ThemeProvider } from 'styled-components'
import authAction from '@global/redux/auth/actions'
import appActions from '@global/redux/app/actions'
import Sidebar from '@global/containers/core/Sidebar/Sidebar'
import Topbar from '@global/containers/core/Topbar/Topbar'
import ThemeSwitcher from '@global/containers/core/ThemeSwitcher'
import AppRouter from '@client/AppRouter'
import { siteConfig } from '@root/settings'
import { AppLocale } from '@global/dashApp'
import themes from '@root/settings/themes'
import AppHolder from '@client/commonStyle'
import '@client/global.css'

const { Content, Footer } = Layout
const { logout } = authAction
const { toggleAll } = appActions
export class App extends Component {
  render () {
    const { url } = this.props.match
    const { locale, selectedTheme, height } = this.props
    const currentAppLocale = AppLocale[locale]
    const appHeight = window.innerHeight
    return (
      <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
          <ThemeProvider theme={themes[selectedTheme]}>
            <AppHolder>
              <Layout style={{ height: appHeight }}>
                <Debounce time='1000' handler='onResize'>
                  <WindowResizeListener onResize={windowSize => this.props.toggleAll(
                    windowSize.windowWidth,
                    windowSize.windowHeight
                  )}
                  />
                </Debounce>
                <Topbar url={url} />
                <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
                  <Sidebar url={url} />
                  <Layout className='isoContentMainLayout' style={{ height: height }}>
                    <Content className='isomorphicContent' style={{ padding: '70px 0 0', flexShrink: '0', background: '#f1f3f6', position: 'relative' }}>
                      <AppRouter url={url} />
                    </Content>
                    <Footer style={{ background: '#ffffff', textAlign: 'center', borderTop: '1px solid #ededed' }}>
                      {siteConfig.footerText}
                    </Footer>
                  </Layout>
                </Layout>
                <ThemeSwitcher />
              </Layout>
            </AppHolder>
          </ThemeProvider>
        </IntlProvider>
      </LocaleProvider>
    )
  }
}

export default connect(
  state => ({
    auth: state.Auth,
    locale: state.LanguageSwitcher.language.locale,
    selectedTheme: state.ThemeSwitcher.changeThemes.themeName,
    height: state.App.height
  }),
  { logout, toggleAll}
)(App)
