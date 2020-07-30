import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Input from '@isomorphic/components/UIelements/input'
import Checkbox from '@isomorphic/components/UIelements/checkbox'
import Button from '@isomorphic/components/UIelements/button'
import IntlMessages from '@isomorphic/components/utility/intlmessages'
import FirebaseLogin from '@global/containers/core/firebase'
import authAction from '@global/redux/auth/actions'
import appAction from '@global/redux/app/actions'
import Auth0 from '@global/authentication/auth0'
import Firebase from '@global/authentication/firebase'
import AccountKitHelper from '@global/authentication/accountKit'
import SignInStyleWrapper from './signin.style'

const { login } = authAction
const { clearMenu } = appAction

class SignIn extends Component {
  state = {
    redirectToReferrer: false
  };

  componentWillReceiveProps (nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true })
    }
  }

  handleLogin = (token = false) => {
    const { login, clearMenu } = this.props
    if (token) {
      login(token)
    } else {
      login()
    }
    clearMenu()
    this.props.history.push('/dashboard')
  };

  render () {
    const { history } = this.props
    const from = { pathname: '/dashboard' }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }
    return (
      <SignInStyleWrapper className='isoSignInPage'>
        <div className='isoLoginContentWrapper'>
          <div className='isoLoginContent'>
            <div className='isoLogoWrapper'>
              <Link to='/dashboard'>
                <IntlMessages id='page.signInTitle' />
              </Link>
            </div>

            <div className='isoSignInForm'>
              <div className='isoInputWrapper'>
                <Input size='large' placeholder='Username' />
              </div>

              <div className='isoInputWrapper'>
                <Input size='large' type='password' placeholder='Password' />
              </div>

              <div className='isoInputWrapper isoLeftRightComponent'>
                <Checkbox>
                  <IntlMessages id='page.signInRememberMe' />
                </Checkbox>
                <Button type='primary' onClick={this.handleLogin}>
                  <IntlMessages id='page.signInButton' />
                </Button>
              </div>

              <p className='isoHelperText'>
                <IntlMessages id='page.signInPreview' />
              </p>

              <div className='isoInputWrapper isoOtherLogin'>
                <Button
                  onClick={this.handleLogin}
                  type='primary'
                  className='btnFacebook'
                >
                  <IntlMessages id='page.signInFacebook' />
                </Button>
                <Button
                  onClick={this.handleLogin}
                  type='primary'
                  className='btnGooglePlus'
                >
                  <IntlMessages id='page.signInGooglePlus' />
                </Button>

                {Auth0.isValid && (
                  <Button
                    onClick={() => {
                      Auth0.login()
                    }}
                    type='primary'
                    className='btnAuthZero'
                  >
                    <IntlMessages id='page.signInAuth0' />
                  </Button>
                )}

                {Firebase.isValid && (
                  <FirebaseLogin history={history} login={this.props.login} />
                )}

                {AccountKitHelper.isValid && (
                  <Button
                    onClick={() => {
                      AccountKitHelper.login('PHONE')
                    }}
                    type='primary'
                    className='btnAccountKit'
                  >
                    <IntlMessages id='page.signInMobile' />
                  </Button>
                )}
              </div>
              <div className='isoCenterComponent isoHelperWrapper'>
                <Link to='/forgotpassword' className='isoForgotPass'>
                  <IntlMessages id='page.signInForgotPass' />
                </Link>
                <Link to='/signup'>
                  <IntlMessages id='page.signInCreateAccount' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    )
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null
  }),
  { login, clearMenu }
)(SignIn)
