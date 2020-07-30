import { fromJS } from 'immutable'
import tilo from '@views/mail/static/img/tilo-avatar.png'
import eric from '@views/mail/static/img/ericf-avatar.png'
import yui from '@views/mail/static/img/yui-avatar.png'
import reid from '@views/mail/static/img/reid-avatar.png'
import andrew from '@views/mail/static/img/andrew-avatar.png'
import yfinance from '@views/mail/static/img/yfinance-avatar.png'
import ynews from '@views/mail/static/img/ynews-avatar.png'

import {
  SELECT_EMAIL, SELECT_GROUP, SEND_EMAIL, SET_FORM
} from '@views/mail/actions/types'

const emailList = fromJS([
  {
    selected: false,
    unread: true,
    avatar: tilo,
    desc: 'Hey, I just wanted to check in with you from Toronto. I got here earlier today.',
    name: 'Tilo Mitra',
    subject: 'Hello from Toronto',
    group: 'inbox'
  },
  {
    selected: false,
    unread: true,
    avatar: eric,
    desc: 'Hey, I had some feedback for pull request #51. We should center the menu so it looks better on mobile.',
    name: 'Eric Ferraiuolo',
    subject: 'Re: Pull Requests',
    group: 'inbox'
  },
  {
    selected: false,
    unread: false,
    avatar: yui,
    desc: 'Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla.',
    name: 'YUI Library',
    subject: 'You have 5 bugs assigned to you',
    group: 'sent'
  },
  {
    selected: false,
    unread: false,
    avatar: reid,
    desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
    name: 'Reid Burke',
    subject: 'Re: Design Language',
    group: 'sent'
  },
  {
    selected: false,
    unread: false,
    avatar: andrew,
    desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    name: 'Andrew Wooldridge',
    subject: 'YUI Blog Updates',
    group: 'sent'
  },
  {
    selected: false,
    unread: false,
    avatar: yfinance,
    desc: 'Mauris tempor mi vitae sem aliquet pharetra. Fusce in dui purus, nec malesuada mauris.',
    name: 'Yahoo! Finance',
    subject: 'How to protect your finances from winter storms',
    group: 'trash'
  },
  {
    selected: false,
    unread: false,
    avatar: ynews,
    desc: 'Yahoo! News',
    name: 'Summary for April 3rd, 2012',
    subject: 'We found 10 news articles that you may like.',
    group: 'trash'
  }
]).groupBy(value => value.get('group'))

const initialState = {
  currentSelect: 'inbox',
  emailList,
  emailBody: '',
  emailSubject: ''
}

const emailReducer = (
  state = fromJS(initialState),
  action = {
    type: ''
  }
) => {
  switch (action.type) {
    case SELECT_GROUP:
      return state.set('currentSelect', action.payload)
    case SELECT_EMAIL:
      return state
        .update('emailList', emailList => emailList.map((value, key) => value.map(item => item.set('selected'), true)))
        .updateIn([
          'emailList',
          action.groupName,
          action.payload
        ], emailItem => emailItem.set('selected', true).set('unread', false))
    case SET_FORM:
      return state.set(action.name, action.value)
    case SEND_EMAIL:
      const description = action.emailBody
        .split(/\s+/)
        .slice(0, 5)
        .join(' ')
      const newEmail = fromJS({
        selected: false,
        unread: true,
        avatar: eric,
        desc: description,
        name: 'Current User',
        subject: action.emailSubject,
        content: action.emailBody,
        group: 'sent'
      })

      return state.updateIn([
        'emailList',
        'sent'
      ], list => list.push(newEmail))
    default:
      return state
  }
}

export default emailReducer
