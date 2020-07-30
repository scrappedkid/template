import PropTypes from 'prop-types'
import React from 'react'
import { Container, Header } from 'semantic-ui-react'

export const PageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='AINA'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        marginTop: mobile ? '1.5em' : '3em',
        fontWeight: 'normal',
        marginBottom: 0
      }}
    />
  </Container>
)

PageHeading.propTypes = {
  mobile: PropTypes.bool
}

export default PageHeading
