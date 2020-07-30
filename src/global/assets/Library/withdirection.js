import React from 'react'

export const rtl =
  process.browser &&
  document.getElementsByTagName('html')[0].getAttribute('dir')

const withdirection = Component => props => (
  <Component {...props} data-rtl={rtl} />
)

export default withdirection
