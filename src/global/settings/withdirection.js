import React from 'react'

const rtl = document.getElementsByTagName('html')[0].getAttribute('dir')
const withdirection = Component => props => {
  return <Component {...props} data-rtl={rtl} />
}

export default withdirection
export { rtl }
