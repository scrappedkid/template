import Enlang from './entries/en-us'
import Zhlang from './entries/zh-hans-cn'
import Salang from './entries/ar_sa'
import Itlang from './entries/it_it'
import Eslang from './entries/es_es'
import Frlang from './entries/fr_fr'
import { addLocaleData } from 'react-intl'

const AppLocale = {
  en: Enlang,
  zh: Zhlang,
  sa: Salang,
  it: Itlang,
  es: Eslang,
  fr: Frlang
}

addLocaleData(AppLocale.en.data)
addLocaleData(AppLocale.zh.data)
addLocaleData(AppLocale.sa.data)
addLocaleData(AppLocale.it.data)
addLocaleData(AppLocale.es.data)
addLocaleData(AppLocale.fr.data)

export default AppLocale
