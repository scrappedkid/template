import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import firebase from 'firebase/app'
import { withFirebase } from '@controllers/middleware/firebase'

const SignOutButton = ({ firebase }) => (
  <Button.Icon onClick={firebase.doSignOut}>
    <Icon name='logout' />
  </Button.Icon>
)

export default withFirebase(SignOutButton)
