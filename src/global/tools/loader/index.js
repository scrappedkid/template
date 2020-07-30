import loadable from '@loadable/component'
import LoadingSpinner from '@layout/LoadingSpinner'

/*,
  TODOO ErrorDisplay
*/

this.props = { LoadingSpinner }

export function loader (
  LoadComponent = loadable(props => import('./'({ LoadComponent })), {
    LoadingComponent: LoadingSpinner,
    // ErrorComponent: ErrorDisplay,
    render: (Component, loading, ownProps) => {}
  })
) {
  return loader()
}
