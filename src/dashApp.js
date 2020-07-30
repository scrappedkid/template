import React from 'react'
import { Provider } from 'react-redux'
import { store, history } from '@global/redux/store'
import PublicRoutes from './router'
import { ThemeProvider } from 'styled-components'
import { LocaleProvider } from 'antd'
import { IntlProvider } from 'react-intl'
import themes from '@root/settings/themes'
import AppLocale from '@global/languageProvider'
import config, {
  getCurrentLanguage
} from '@global/containers/core/languageswitcher/config\'
import { themeConfig } from '@root/settings'
import DashAppHolder from './dashAppStyle'
import Boot from '@global/redux/boot'

const currentAppLocale =
  AppLocale[getCurrentLanguage(config.defaultLanguage || 'english').locale]

const DashApp = () => (
  <LocaleProvider locale={currentAppLocale.antd}>
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ThemeProvider theme={themes[themeConfig.theme]}>
        <DashAppHolder>
          <Provider store={store}>
            <PublicRoutes history={history} />
          </Provider>
        </DashAppHolder>
      </ThemeProvider>
    </IntlProvider>
  </LocaleProvider>
)
Boot()
  .then(() => DashApp())
  .catch(error => console.error(error))

export default DashApp
export { AppLocale }
