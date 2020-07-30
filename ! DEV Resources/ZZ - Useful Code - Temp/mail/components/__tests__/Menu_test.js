import { render, shallow } from 'enzyme'
import React from 'react'
import { Link, HashRouter as Router } from 'react-router-dom'
import { Map, fromJS, is } from 'immutable'
import R from 'ramda'
import {
  Menu, MenuItem, capString, getMenuItems, mapStateToProps, renderMenu
} from '../Menu'

describe('Menu', () => {
  let menu = null

  let selectGroup = null

  beforeEach(() => {
    selectGroup = jest.fn()
    menu = shallow(<Menu menuItems={fromJS([])} selectGroup={selectGroup} />)
  })

  it('should have a renderMenu method', () => {
    expect(renderMenu).toBeTruthy()
  })
  it('renderMenu should behave as expected', () => {
    const renderMenuItems = renderMenu(R.identity)

    const testMap = Map({ inbox: 2 })

    const result = renderMenuItems(testMap).valueSeq()

    const component = render(<Router children={result.get(0)} />)

    expect(result.size).toEqual(1)
    expect(component.text()).toContain('inbox')
    expect(component.text()).toContain('2')
  })
  it('should have a mapStateToProps method and should work as expected', () => {
    const testData = {
      test1: [
        {
          name: 'test',
          group: 'test1'
        }
      ],
      test2: [
        {
          name: 'test1',
          group: 'test2'
        }
      ]
    }

    const expResult = {
      menuItems: Map({
        Test1: 1,
        Test2: 1
      })
    }

    const state = {
      email: fromJS({ emailList: testData })
    }

    const actResult = mapStateToProps(state)

    expect(mapStateToProps).toBeDefined()
    expect(is(expResult.menuItems, actResult.menuItems)).toBeTruthy()
  })
  it('should have a menu', () => {
    expect(menu.find('.pure-menu').length).toEqual(1)
  })
  it('should have menu list', () => {
    expect(menu.find('.pure-menu-list').length).toEqual(1)
  })
  it('should have menu items', () => {
    expect(menu.find('.pure-menu-item').length).toEqual(0)
  })
  it('should have Link to compose button', () => {
    expect(menu.find(Link).exists()).toBeTruthy()
  })

  it('should have the menu items according to props', () => {
    const sampleProps = {
      inbox: 0,
      sent: 3
    }

    const menuItems = shallow(<Menu menuItems={fromJS(sampleProps)} selectGroup={jest.fn()} />)

    expect(menuItems.find(MenuItem).length).toEqual(2)
  })
  it('should have the capString method and should work as expected', () => {
    expect(capString('hello')).toEqual('Hello')
    expect(capString('why')).toEqual('Why')
  })
  it('should have a method called getMenuItems to derive data from store', () => {
    const testData = fromJS({
      test1: [
        {
          name: 'test',
          group: 'test1'
        }
      ],
      test2: [
        {
          name: 'test1',
          group: 'test2'
        }
      ]
    })

    const result = Map({
      Test1: 1,
      Test2: 1
    })

    const actualResult = getMenuItems(testData)

    expect(is(result, actualResult)).toBeTruthy()
  })
})

describe('MenuItem', () => {
  let menuItem = null

  beforeEach(() => {
    menuItem = shallow(<MenuItem name='Inbox' count={3} path='/inbox' />)
  })
  it('should have anchor component', () => {
    expect(menuItem.find(Link).exists()).toBeTruthy()
  })
  it('should show the email count when count is provided', () => {
    expect(menuItem.find('.email-count').text()).toContain(3)
  })
  it('should not show email count when count is not provided', () => {
    const menu = shallow(<MenuItem name='Inbox' />)

    expect(menu.find('.email-count').exists()).toBeFalsy()
  })
})
