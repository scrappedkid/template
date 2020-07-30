import PropTypes from 'prop-types'
import React from 'react'
import ContentContainer from './ContentContainer'

const PageContainer = ({ children }) => (
  <div>
    <ContentContainer>{children}</ContentContainer>
  </div>
)

PageContainer.propTypes = {
  children: PropTypes.node
}

export default PageContainer
