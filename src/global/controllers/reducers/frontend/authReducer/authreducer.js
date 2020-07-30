import { combineReducers } from 'redux'
import sessionReducer from './session'
import userReducer from './user'
import messageReducer from './message'
import locationReducer from '../../BackEnd/location'

export { sessionReducer, locationReducer, userReducer, messageReducer }

const authReducer = combineReducers({
  location: locationReducer,
  session: sessionReducer,
  user: userReducer,
  message: messageReducer
})

export default authReducer
