import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import asyncComponent from '@global/helpers/asyncfunc'
import customRoutes from '@app/router'

const routes = [
  {
    path: '',
    component: asyncComponent(() => import('@global/containers/core/widgets'))
  },
  {
    path: 'inbox',
    component: asyncComponent(() => import('@global/containers/core/mail'))
  },
  {
    path: 'scrum-board',
    component: asyncComponent(() =>
      import('@global/containers/core/scrumboard')
    ),
    exact: false
  },
  {
    path: 'mailbox',
    component: asyncComponent(() => import('@global/containers/core/mail'))
  },
//  {
//    path: 'calendar',
//    component: asyncComponent(() =>
//      import('@global/containers/core/calendar/calendar')
//    )
//  },
  {
    path: 'googlemap',
    component: asyncComponent(() =>
      import('@global/containers/core/map/googlemap/googlemap')
    )
  },
  {
    path: 'leafletmap',
    component: asyncComponent(() =>
      import('@global/containers/core/map/leaflet/leaflet')
    )
  },
  {
    path: 'table_ant',
    component: asyncComponent(() =>
      import('@global/containers/core/tables/anttables')
    )
  },
  {
    path: 'allFormComponent',
    component: asyncComponent(() =>
      import('@global/containers/core/forms/allcomponents/')
    )
  },
  {
    path: 'InputField',
    component: asyncComponent(() =>
      import('@global/containers/core/forms/input')
    )
  },
  {
    path: 'editor',
    component: asyncComponent(() =>
      import('@global/containers/core/forms/editor/')
    )
  },
  {
    path: 'stepperForms',
    component: asyncComponent(() =>
      import('@global/containers/core/forms/stepperforms/')
    )
  },
  {
    path: 'FormsWithValidation',
    component: asyncComponent(() =>
      import('@global/containers/core/forms/formswithvalidation')
    )
  },
  {
    path: 'progress',
    component: asyncComponent(() =>
      import('@global/containers/core/forms/progress')
    )
  },
  {
    path: 'button',
    component: asyncComponent(() =>
      import('@global/containers/core/forms/button')
    )
  },
  {
    path: 'tab',
    component: asyncComponent(() => import('@global/containers/core/forms/tab'))
  },
  {
    path: 'autocomplete',
    component: asyncComponent(() =>
      import('@global/containers/core/forms/autocomplete')
    )
  },
  {
    path: 'checkbox',
    component: asyncComponent(() =>
      import('@global/containers/core/forms/checkbox')
    )
  },
  {
    path: 'radiobox',
    component: asyncComponent(() =>
      import('@global/containers/core/forms/radiobox/')
    )
  },
  {
    path: 'selectbox',
    component: asyncComponent(() =>
      import('@global/containers/core/forms/select/')
    )
  },
  {
    path: 'transfer',
    component: asyncComponent(() =>
      import('@global/containers/core/forms/transfer/')
    )
  },
  {
    path: 'gridLayout',
    component: asyncComponent(() =>
      import('@global/containers/core/box/gridlayout')
    )
  },
  {
    path: 'notes',
    component: asyncComponent(() => import('@global/containers/core/notes'))
  },
  {
    path: 'todo',
    component: asyncComponent(() => import('@global/containers/core/todo'))
  },
  {
    path: 'articles',
    component: asyncComponent(() =>
      import('@global/containers/core/firestorecrud/article')
    )
  },
  // {
  //   path: 'investors',
  //   component: asyncComponent(() =>
  //     import('@global/containers/core/firestorecrud/investor')
  //   )
  // },
  {
    path: 'contacts',
    component: asyncComponent(() => import('@global/containers/core/contacts'))
  },
  {
    path: 'alert',
    component: asyncComponent(() =>
      import('@global/containers/core/feedback/alert')
    )
  },
  {
    path: 'modal',
    component: asyncComponent(() =>
      import('@global/containers/core/feedback/modal/')
    )
  },
  {
    path: 'message',
    component: asyncComponent(() =>
      import('@global/containers/core/feedback/message')
    )
  },
  {
    path: 'notification',
    component: asyncComponent(() =>
      import('@global/containers/core/feedback/notification')
    )
  },
  {
    path: 'Popconfirm',
    component: asyncComponent(() =>
      import('@global/containers/core/feedback/popconfirm')
    )
  },
  {
    path: 'spin',
    component: asyncComponent(() =>
      import('@global/containers/core/feedback/spin')
    )
  },
  {
    path: 'shuffle',
    component: asyncComponent(() => import('@global/containers/core/shuffle'))
  },
  {
    path: 'affix',
    component: asyncComponent(() =>
      import('@global/containers/core/navigation/affix')
    )
  },
  {
    path: 'breadcrumb',
    component: asyncComponent(() =>
      import('@global/containers/core/UIelements/breadcrumb/breadcrumb')
    )
  },
  {
    path: 'backToTop',
    component: asyncComponent(() =>
      import('@global/containers/core/navigation/backtotop')
    )
  },
  {
    path: 'dropdown',
    component: asyncComponent(() =>
      import('@global/containers/core/UIelements/dropdown/dropdown')
    )
  },
  {
    path: 'op_badge',
    component: asyncComponent(() =>
      import('@global/containers/core/UIelements/badge')
    )
  },
  {
    path: 'op_card',
    component: asyncComponent(() =>
      import('@global/containers/core/UIelements/card')
    )
  },
  {
    path: 'op_carousel',
    component: asyncComponent(() =>
      import('@global/containers/core/UIelements/carousel')
    )
  },
  {
    path: 'op_collapse',
    component: asyncComponent(() =>
      import('@global/containers/core/UIelements/collapse')
    )
  },
  {
    path: 'op_tooltip',
    component: asyncComponent(() =>
      import('@global/containers/core/UIelements/tooltip/')
    )
  },
  {
    path: 'rating',
    component: asyncComponent(() =>
      import('@global/containers/core/UIelements/rating/')
    )
  },
  {
    path: 'tree',
    component: asyncComponent(() =>
      import('@global/containers/core/UIelements/tree/')
    )
  },
  {
    path: 'op_tag',
    component: asyncComponent(() =>
      import('@global/containers/core/UIelements/tag')
    )
  },
  {
    path: 'op_timeline',
    component: asyncComponent(() =>
      import('@global/containers/core/UIelements/timeline')
    )
  },
  {
    path: 'op_popover',
    component: asyncComponent(() =>
      import('@global/containers/core/UIelements/popover')
    )
  },
  {
    path: 'googleChart',
    component: asyncComponent(() =>
      import('@global/containers/core/charts/googlechart')
    )
  },
  {
    path: 'reecharts',
    component: asyncComponent(() =>
      import('@global/containers/core/charts/recharts')
    )
  },
  {
    path: 'menu',
    component: asyncComponent(() =>
      import('@global/containers/core/navigation/menu')
    )
  },
  {
    path: 'ReactChart2',
    component: asyncComponent(() =>
      import('@global/containers/core/charts/reactchart2')
    )
  },
  {
    path: 'pagination',
    component: asyncComponent(() =>
      import('@global/containers/core/UIelements/pagination/pagination')
    )
  },
  {
    path: 'card',
    component: asyncComponent(() =>
      import('@global/containers/core/ecommerce/card')
    )
  },
  {
    path: 'cart',
    component: asyncComponent(() =>
      import('@global/containers/core/ecommerce/cart')
    )
  },
  {
    path: 'checkout',
    component: asyncComponent(() =>
      import('@global/containers/core/ecommerce/checkout')
    )
  },
  {
    path: 'shop',
    component: asyncComponent(() =>
      import('@global/containers/core/ecommerce/algolia/instantsearch')
    )
  },
  {
    path: 'reactDates',
    component: asyncComponent(() =>
      import('@global/containers/core/advancedui/reactdates/reactdates')
    )
  },
  {
    path: 'codemirror',
    component: asyncComponent(() =>
      import('@global/containers/core/advancedui/codemirror')
    )
  },
  {
    path: 'uppy',
    component: asyncComponent(() =>
      import('@global/containers/core/advancedui/uppy')
    )
  },
  {
    path: 'dropzone',
    component: asyncComponent(() =>
      import('@global/containers/core/advancedui/dropzone')
    )
  },
  {
    path: 'youtubeSearch',
    component: asyncComponent(() =>
      import('@global/containers/core/youtubesearch')
    )
  },
  {
    path: 'frappeChart',
    component: asyncComponent(() =>
      import('@global/containers/core/charts/frappechart')
    )
  },
  {
    path: 'invoice/:invoiceId',
    component: asyncComponent(() =>
      import('@global/containers/core/invoice/singleinvoice')
    )
  },
  {
    path: 'invoice',
    component: asyncComponent(() => import('@global/containers/core/invoice'))
  },
  {
    path: 'chat',
    component: asyncComponent(() => import('@global/containers/core/chat'))
  },
  ...customRoutes
]

class AppRouter extends Component {
  render () {
    const { url, style } = this.props
    return (
      <div style={style}>
        {routes.map(singleRoute => {
          const { path, exact, ...otherProps } = singleRoute
          return (
            <Route
              exact={exact !== false}
              key={singleRoute.path}
              path={`${url}/${singleRoute.path}`}
              {...otherProps}
            />
          )
        })}
      </div>
    )
  }
}

export default AppRouter
