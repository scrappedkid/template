import React from 'react'
import { shallow } from 'enzyme'
import { Avatar, MetaEmail, UserDetails } from '../MetaEmail'

describe('MetaEmail', () => {
  let metaEmail = null

  beforeEach(() => {
    const sampleProps = {
      selected: false,
      unread: false,
      name: 'Test',
      desc: 'Hello Test',
      subject: 'TestSubject',
      avatar: './src/img/test.jpg'
    }

    metaEmail = shallow(<MetaEmail {...sampleProps} />)
  })
  it('should have proper name,desc,subject', () => {
    const userDetails = shallow(<UserDetails name='Test' subject='TestSubject' desc='Hello Test' />)

    expect(userDetails.text()).toContain('Test')
    expect(userDetails.text()).toContain('TestSubject')
    expect(userDetails.text()).toContain('Hello Test')
  })
  it('should have a Avatar component', () => {
    expect(metaEmail.find(Avatar).length).toEqual(1)
  })

  it('should have atleast one email-item div', () => {
    expect(metaEmail.find('.email-item').length).toEqual(1)
  })
  it('should show correct classname as per the conditionals', () => {
    const sample = {
      selected: true,
      unread: false,
      name: 'Test',
      desc: 'Hello Test',
      subject: 'TestSubject',
      avatar: './src/img/test.jpg'
    }

    const Email1 = shallow(<MetaEmail {...sample} />)

    sample.unread = true
    const Email2 = shallow(<MetaEmail {...sample} />)

    sample.selected = false
    sample.unread = false
    const Email3 = shallow(<MetaEmail {...sample} />)

    expect(Email1.props().className).toContain('email-item-selected')
    expect(Email2.props().className).toContain('email-item-unread')
    expect(Email2.props().className).not.toContain('email-item-selected')
    expect(Email3.props().className).not.toContain('email-item-unread email-item-selected')
  })
})

describe('Avatar', () => {
  let avatar = null

  beforeEach(() => {
    avatar = shallow(<Avatar avatar='./img/src/test.jpg' />)
  })
  it('should have a email-avatar element', () => {
    expect(avatar.find('.email-avatar').exists()).toBeTruthy()
  })
  it('should have a img element', () => {
    expect(avatar.find('img').exists()).toBeTruthy()
  })
  it('should have correct width and height', () => {
    expect(avatar.find('.email-avatar').props().width).toEqual('64')
    expect(avatar.find('.email-avatar').props().height).toEqual('64')
  })
})
