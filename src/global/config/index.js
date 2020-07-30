export const env = 'local'

/**
*!   (                   )
*!   )\ ) (  (     (  ( /(     )      (
*!  (()/( )\ )(   ))\ )\()) ( /( (   ))\
*!   /(_)|(_|()\ /((_|(_)\  )(_)))\ /((_)
*?  (_) _|(_)((_|_)) | |(_)((_)_((_|_))
*?   |  _|| | '_/ -_)| '_ \/ _` (_-< -_)
*?   |_|  |_|_| \___||_.__/\__,_/__|___|
*/

export const fbConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

export const rrfConfig = {
  projectName: 'Aina',
  useFirestoreForStorageMeta: true,
  useFirestoreForProfile: false,
  updateProfileOnLogin: true,
  attachAuthIsReady: true,
  enableLogging: false,
  userProfile: 'users',
  presence: 'online',
  role: 'roles',
  sessions: null,
  profileParamsToPopulate: [
    {
      root: 'roles',
      child: 'role'
    }
  ],
  profileFactory: user => ({
    email: user.email || user.providerData[0].email,
    providerData: user.providerData
  })
}

/**
 *TODO     ███╗   ███╗ ██████╗ ██████╗ ███████╗
 *TODO     ████╗ ████║██╔═══██╗██╔══██╗██╔════╝
 *TODO     ██╔████╔██║██║   ██║██████╔╝█████╗
 *TODO     ██║╚██╔╝██║██║   ██║██╔══██╗██╔══╝
 *TODO     ██║ ╚═╝ ██║╚██████╔╝██║  ██║███████╗
 *TODO     ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝
 */
// Other site wisde URLSearchParams, make sections for

export const analyticsTrackingId = process.env.REACT_APP_GOOG_ANALYTICS_ID
export const sentryDsn = process.env.SENTRY_DSN
export const publicVapidKey = process.env.REACT_APP_PUBLIC_V_API_KEY

export default {
  env,
  fbConfig,
  rrfConfig,
  analyticsTrackingId,
  publicVapidKey,
  sentryDsn
}
