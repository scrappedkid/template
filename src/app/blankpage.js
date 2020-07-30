import React, { Component } from 'react'
import LayoutContentWrapper from '@global/components/core/utility/layoutwrapper.js'
import LayoutContent from '@global/components/core/utility/layoutContent'

export default class extends Component {
  render () {
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>Blank Page</h1>
        </LayoutContent>
      </LayoutContentWrapper>
    )
  }
}
