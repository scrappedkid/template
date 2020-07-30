import { SELECT_EMAIL, SELECT_GROUP } from '../types'
import { selectEmail, selectGroup } from '../index'

describe('selectGroup action', () => {
  it('should have correct type', () => {
    expect(selectGroup('inbox').type).toEqual(SELECT_GROUP)
  })
  it('should have correct payload', () => {
    expect(selectGroup('sent').payload).toEqual('sent')
  })
})

describe('selectEmail action', () => {
  it('should have correct type', () => {
    expect(selectEmail('inbox', 1).type).toEqual(SELECT_EMAIL)
  })
  it('should have correct payload', () => {
    expect(selectEmail('inbox', 2).payload).toEqual(2)
    expect(selectEmail('inbox', 2).groupName).toEqual('inbox')
  })
  it('should have proper default values', () => {
    expect(selectEmail(undefined, 2).groupName).toEqual('inbox')
    expect(selectEmail(undefined, 2).payload).toEqual(2)
  })
})
