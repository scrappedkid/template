import { fromJS, is } from 'immutable'
import {
  selectEmail, selectGroup, sendEmail, setForm
} from '../../actions'

import email from '../email'

describe('email reducer', () => {
  it('should have correct default value', () => {
    expect(email().has('currentSelect')).toBeTruthy()
    expect(email().has('emailList')).toBeTruthy()
  })
  it('should have state as passed', () => {
    const state = fromJS({
      currentSelect: 'test',
      emailList: []
    })

    expect(email(state, undefined).get('currentSelect')).toEqual('test')
    expect(email(state, undefined)
      .get('emailList')
      .isEmpty()).toBeTruthy()
  })
  it('should select group according to action', () => {
    expect(email(undefined, selectGroup('sent')).get('currentSelect')).toEqual('sent')
  })
  it('should select email by setting the required props', () => {
    const first = email(undefined, selectGroup('inbox'))

    const result = email(first, selectEmail('inbox', 1))

    expect(result.getIn([
      'emailList',
      'inbox',
      '1',
      'selected'
    ])).toBeTruthy()
    expect(result.getIn([
      'emailList',
      'inbox',
      '1',
      'unread'
    ])).toBeFalsy()
  })
  it('should select one item at a time', () => {
    const first = email(undefined, selectGroup('inbox'))

    const second = email(first, selectEmail('inbox', 0))

    const result = email(second, selectEmail('inbox', 1))

    expect(result.getIn([
      'emailList',
      'inbox',
      '0',
      'selected'
    ])).toBeFalsy()
    expect(result.getIn([
      'emailList',
      'inbox',
      '1',
      'selected'
    ])).toBeTruthy()
  })
  it('should add the new email item to list if emails', () => {
    const newEmail = email(fromJS({ emailList: { sent: [] } }), sendEmail('title', 'body'))

    const sent = newEmail.getIn([
      'emailList',
      'sent'
    ])

    const emailItem = sent.get(0)

    expect(sent.size).toEqual(1)
    expect(emailItem.get('subject')).toEqual('title')
    expect(emailItem.get('content')).toEqual('body')
    expect(emailItem.get('desc')).toEqual('body')
    expect(emailItem.get('name')).toEqual('Current User')
    expect(emailItem.get('avatar')).toEqual('ericf-avatar.png')
    expect(emailItem.get('selected')).toBeFalsy()
    expect(emailItem.get('unread')).toBeTruthy()
  })
  it('should set form values', () => {
    const newState = email(fromJS({}), setForm('name', 'value'))

    expect(newState.has('name')).toBeTruthy()
    expect(newState.get('name')).toEqual('value')
  })
})
