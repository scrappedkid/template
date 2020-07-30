export function injectReducer (store, { key, reducer }) {
  store.asyncReducers[key] = reducer
  store.replaceReducer(rootReducer(store.asyncReducers))
}
