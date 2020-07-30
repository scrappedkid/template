import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const LoadingSpinner = ({ inverted }) => (
  <Dimmer inverted={inverted}>
    <Loader content='Loading...' />
  </Dimmer>
)

export default LoadingSpinner
