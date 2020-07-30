import React from 'react'
import PageContainer from './PageContainer'

const CoreLayout = router => (
  <PageContainer>
    <div>{router.routes}</div>
  </PageContainer>
)

export default CoreLayout
