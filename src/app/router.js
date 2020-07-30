import asyncComponent from '@global/helpers/asyncfunc'

const routes = [
  {
    path: 'githubSearch',
    component: asyncComponent(() => import('@app/containers/core/GithubSearch')
    )
  },
  {
    path: 'blank_page',
    component: asyncComponent(() => import('@app/containers/core/blankpage')
    )
  }
]
export default routes
