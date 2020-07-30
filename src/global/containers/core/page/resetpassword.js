import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Input from '@isomorphic/components/UIelements/input'
import Button from '@isomorphic/components/UIelements/button'
import IntlMessages from '@isomorphic/components/utility/intlmessages'
import ResetPasswordStyleWrapper from './resetpassword.style'

export default class extends Component {
  render () {
    return (
      <ResetPasswordStyleWrapper className='isoResetPassPage'>
        <div className='isoFormContentWrapper'>
          <div className='isoFormContent'>
            <div className='isoLogoWrapper'>
              <Link to='/dashboard'>
                <IntlMessages id='page.resetPassTitle' />
              </Link>
            </div>

            <div className='isoFormHeadText'>
              <h3>
                <IntlMessages id='page.resetPassSubTitle' />
              </h3>
              <p>
                <IntlMessages id='page.resetPassDescription' />
              </p>
            </div>

            <div className='isoResetPassForm'>
              <div className='isoInputWrapper'>
                <Input
                  size='large'
                  type='password'
                  placeholder='New Password'
                />
              </div>

              <div className='isoInputWrapper'>
                <Input
                  size='large'
                  type='password'
                  placeholder='Confirm Password'
                />
              </div>

              <div className='isoInputWrapper'>
                <Button type='primary'>
                  <IntlMessages id='page.resetPassSave' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ResetPasswordStyleWrapper>
    )
  }
}
