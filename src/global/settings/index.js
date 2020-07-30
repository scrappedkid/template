export default {
  apiUrl: 'http://allineed.app/api/'
}

const siteConfig = {
  siteName: 'All i Need',
  siteIcon: 'ion-flash',
  footerText: 'All i Need Corp.'
}

const themeConfig = {
  topbar: 'themedefault',
  sidebar: 'themedefault',
  layout: 'themedefault',
  theme: 'themedefault'
}

const language = 'english'

const AlgoliaSearchConfig = {
  appId: '',
  apiKey: ''
}

const Auth0Config = {
  domain: '',
  clientID: '',
  allowedConnections: ['Username-Password-Authentication'],
  rememberLastLogin: true,
  language: 'en',
  closable: true,
  options: {
    auth: {
      autoParseHash: true,
      redirect: true,
      redirectUrl: 'http://localhost:3000/auth0loginCallback'
    },
    languageDictionary: {
      title: 'All i Need',
      emailInputPlaceholder: 'demo@gmail.com',
      passwordInputPlaceholder: 'demodemo'
    },
    theme: {
      labeledSubmitButton: true,
      logo: '',
      primaryColor: '#E14615',
      authButtons: {
        connectionName: {
          displayName: 'Log In',
          primaryColor: '#b7b7b7',
          foregroundColor: '#000000'
        }
      }
    }
  }
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

const googleConfig = {
  apiKey: '' //
}

const mapboxConfig = {
  tileLayer: '',
  maxZoom: '',
  defaultZoom: '',
  center: []
}

const youtubeSearchApi = ''
export {
  siteConfig,
  themeConfig,
  language,
  AlgoliaSearchConfig,
  Auth0Config,
  firebaseConfig,
  googleConfig,
  mapboxConfig,
  youtubeSearchApi
}
