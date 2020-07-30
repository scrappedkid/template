import 'firebase/auth'
import 'firebase/database'

import firebase from 'firebase/app'

var Rebase = require('re-base')

export const fbConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

class Firebase {
  constructor () {
    this.serverValue = firebase.database.ServerValue
    this.emailAuthProvider = firebase.auth.EmailAuthProvider

    /* Firebase APIs */

    this.auth = firebase.auth()
    this.db = firebase.database()

    /* Add on ReBase */

    this.base = Rebase.createClass(this.db)

    /* Social Sign In Method Provider */

    this.googleProvider = new firebase.auth.GoogleAuthProvider()
    this.facebookProvider = new firebase.auth.FacebookAuthProvider()
    this.githubProvider = new firebase.auth.GithubAuthProvider()
    this.twitterProvider = new firebase.auth.TwitterAuthProvider()
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password)

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider)

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider)

  doSignInWithGithub = () => this.auth.signInWithPopup(this.githubProvider)

  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider)

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doSendEmailVerification = () => this.auth.currentUser.sendEmailVerification({
    url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
  })

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)
  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) => this.auth.onAuthStateChanged(user => {
    if (user) {
      this.user(user.uid)
        .once('value')
        .then(snapshot => {
          const dbUser = snapshot.val()

          // default empty roles
          if (!dbUser.roles) {
            dbUser.roles = ['Admin']
          }

          // merge auth and db user
          user = {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            providerData: user.providerData,
            ...dbUser
          }

          next(user)
        })
    } else {
      fallback()
    }
  })
  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`)

  users = () => this.db.ref('users')
  // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`)

  messages = () => this.db.ref('messages')
}

export default Firebase
