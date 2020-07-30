# FirebaseImportant things

```javascript
import firebase from 'firebase/app';
import firebaseConfig from '../config/firebaseConfig';
import React from "react";
```

```javascript
export const fbContext = React.createContext(null);
export const withFirebase = (Component) => (props) => <fbContext.Consumer>{(firebase) => <Component {...props} firebase={firebase} />}</fbContext.Consumer>;
```
> ##     Helper Actions

```javascript
export class Firebase {
  constructor() {
    this.auth = firebase.auth();
    this.db = firebase.database();
```

> ##     Social Sign In Method Provider

```javascript
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.facebookProvider = new firebase.auth.FacebookAuthProvider();
    this.githubProvider = new firebase.auth.GithubAuthProvider();
```

>     Auth API ***
```javascript
  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithGithub = () => this.auth.signInWithPopup(this.githubProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: firebaseConfig.emailRedirect,
    });
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
```

>        Merge Auth and DB User API ***

```javascript
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });
```

>          User API ***

```javascript
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
```

>        Roles API ***

```javascript
  role = role => this.db.ref(`roles/${role}`);
  roles = () => this.db.ref('roles');
```

>        Message API ***

```javascript
  message = uid => this.db.ref(`messages/${uid}`);
  messages = () => this.db.ref('messages');
}
```

```js

>  #    export default Firebase;
