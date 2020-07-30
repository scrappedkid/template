import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Input from '@isomorphic/components/UIelements/input'
import Checkbox from '@isomorphic/components/UIelements/checkbox'
import Button from '@isomorphic/components/UIelements/button'
import FirebaseLogin from '@global/containers/core/firebase'
import authAction from '@global/redux/auth/actions'
import appActions from '@global/redux/app/actions'
import Auth0 from '@global/authentication/auth0'
import Firebase from '@global/authentication/firebase'
import AccountKitHelper from '@global/authentication/accountKit'
import IntlMessages from '@isomorphic/components/utility/intlmessages'
import SignUpStyleWrapper from './signup.style'

const { login } = authAction
const { clearMenu } = appActions

class SignUp extends Component {
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
    console.log(token, 'handlelogin')
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
    return (
      <SignUpStyleWrapper className='isoSignUpPage'>
        <div className='isoSignUpContentWrapper'>
          <div className='isoSignUpContent'>
            <div className='isoLogoWrapper'>
              <Link to='/dashboard'>
                <IntlMessages id='page.signUpTitle' />
              </Link>
            </div>

            <div className='isoSignUpForm'>
              <div className='isoInputWrapper isoLeftRightComponent'>
                <Input size='large' placeholder='First name' />
                <Input size='large' placeholder='Last name' />
              </div>

              <div className='isoInputWrapper'>
                <Input size='large' placeholder='Username' />
              </div>

              <div className='isoInputWrapper'>
                <Input size='large' placeholder='Email' />
              </div>

              <div className='isoInputWrapper'>
                <Input size='large' type='password' placeholder='Password' />
              </div>

              <div className='isoInputWrapper'>
                <Input
                  size='large'
                  type='password'
                  placeholder='Confirm Password'
                />
              </div>

              <div className='isoInputWrapper' style={{ marginBottom: '50px' }}>
                <Checkbox>
                  <IntlMessages id='page.signUpTermsConditions' />
                </Checkbox>
              </div>

              <div className='isoInputWrapper'>
                <Button type='primary'>
                  <IntlMessages id='page.signUpButton' />
                </Button>
              </div>
              <div className='isoInputWrapper isoOtherLogin'>
                <Button
                  onClick={this.handleLogin}
                  type='primary'
                  className='btnFacebook'
                >
                  <IntlMessages id='page.signUpFacebook' />
                </Button>
                <Button
                  onClick={this.handleLogin}
                  type='primary'
                  className='btnGooglePlus'
                >
                  <IntlMessages id='page.signUpGooglePlus' />
                </Button>
                {Auth0.isValid && (
                  <Button
                    onClick={() => {
                      Auth0.login()
                    }}
                    type='primary'
                    className='btnAuthZero'
                  >
                    <IntlMessages id='page.signUpAuth0' />
                  </Button>
                )}

                {Firebase.isValid && (
                  <FirebaseLogin
                    signup
                    histor={history}
                    login={this.props.login}
                  />
                )}

                {AccountKitHelper.isValid && (
                  <Button
                    onClick={() => {
                      AccountKitHelper.login('PHONE')
                    }}
                    type='primary'
                    className='btnAccountKit'
                  >
                    <IntlMessages id='page.signUpMobile' />
                  </Button>
                )}
              </div>
              <div className='isoInputWrapper isoCenterComponent isoHelperWrapper'>
                <Link to='/signin'>
                  <IntlMessages id='page.signUpAlreadyAccount' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignUpStyleWrapper>
    )
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null
  }),
  { login, clearMenu }
)(SignUp)
