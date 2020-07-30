import React from 'react'
import loadable from '@loadable/component'

const fbmessages = loadable(() => import('./fbmessages'))

function messages () {
  return (
    <div>
      <fbmessages />
    </div>
  )
}

export default messages
