/* global expect it describe jest */
import reactdom from 'react-dom'

import * as setup from './setupStore'

describe('index file', () => {
  it('should call the setupStore function and the reactDOM.render method', () => {
    reactdom.render = jest.fn()
    setup.setupStore = jest.fn(setup.setupStore)
    // eslint-disable-next-line
    require('./index')
    expect(setup.setupStore).toHaveBeenCalledTimes(1)
    expect(reactdom.render).toHaveBeenCalledTimes(1)
  })
})
