import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'
import { fromJS } from 'immutable'
import { DefaultBody, EmailHeader, EmailViewer } from '../EmailViewer'

describe('EmailViewer', () => {
  let emailEditor = null

  beforeEach(() => {
    const sampleProps = fromJS({
      inbox: [
        {
          selected: false,
          unread: true,
          avatar: 'tilo.jpg',
          desc: 'Hey, I just wanted to check in with you from Toronto. I got here earlier today.',
          name: 'Tilo Mitra',
          subject: 'Hello from Toronto',
          group: 'inbox'
        },
        {
          selected: false,
          unread: true,
          avatar: 'eric',
          desc:
            'Hey, I had some feedback for pull request #51. We should center the menu so it looks better on mobile.',
          name: 'Eric Ferraiuolo',
          subject: 'Re: Pull Requests',
          group: 'inbox'
        }
      ]
    })

    emailEditor = shallow(<EmailViewer match={{ params: { emailId: 1 } }} emailList={sampleProps} />)
  })
  it('should have email-content class', () => {
    expect(emailEditor.find('.email-content').exists()).toBeTruthy()
  })
  it('should have email header and relevant content', () => {
    expect(emailEditor.find(EmailHeader).exists()).toBeTruthy()
  })
  it('should have email body to edit text', () => {
    expect(emailEditor.find('.email-content-body').exists()).toBeTruthy()
  })
  it('should have a DefaultBody and should have a div inside it', () => {
    expect(DefaultBody).toBeDefined()
    const defaultBody = shallow(<DefaultBody />)

    expect(defaultBody.find('div')).toBeDefined()
  })
})

describe('EmailHeader', () => {
  let emailEditor = null

  beforeEach(() => {
    const sampleProps = {
      title: 'Hello from Toronto',
      name: 'Tilo Mitra'
    }

    emailEditor = shallow(<EmailHeader {...sampleProps} />)
  })

  it('should have email header and relevant content', () => {
    expect(emailEditor.find('.email-content-header').exists()).toBeTruthy()
    expect(emailEditor.find('.email-content-title').exists()).toBeTruthy()
    expect(emailEditor.find('.email-content-controls').exists()).toBeTruthy()
  })
  it('should have Link reply button', () => {
    expect(emailEditor.find(Link).exists()).toBeTruthy()
  })
  it('should have relevant content based on props', () => {
    expect(emailEditor.find('.email-content-title').text()).toContain('Hello from Toronto')
    expect(emailEditor.find('.email-content-subtitle').text()).toContain('Tilo Mitra')
  })
})
