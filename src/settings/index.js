export default {
  apiUrl: 'http://localhost/api/'
}

const siteConfig = {
  siteName: 'All i Need.',
  siteIcon: 'ion-flash',
  footerText: 'FOOTER TEXT'
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
      title: 'Isomorphic',
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
  apiKey: 'AIzaSyCvSn1n-A5chYgwRpppkPgS37GgPPoQaRI',
  authDomain: 'rising-city-221113.firebaseapp.com',
  databaseURL: 'https://rising-city-221113.firebaseio.com',
  projectId: 'rising-city-221113',
  storageBucket: 'rising-city-221113.appspot.com',
  messagingSenderId: '128930447201'
}

const googleConfig = {
  apiKey: '128930447201 - mk4h63v2hqgsebra81alsa68ntrq6j13.apps.googleusercontent.com'
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
