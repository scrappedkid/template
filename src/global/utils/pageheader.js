import React from 'react'
import { ComponentTitleWrapper } from './pageheader.style'

export default props => <ComponentTitleWrapper className='isoComponentTitle'>
  {props.children}
</ComponentTitleWrapper>
