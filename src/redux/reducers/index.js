// IMPORTANT: The reducer is predefined for redux forms
import { combineReducers } from 'redux'  
import { reducer as formReducer } from 'redux-form'  
import  UserReducer from './UserReducer'
import  FilterKeysReducer from './FilterKeysReducer'  
import  ProductsReducer from './ProductsReducer'
import  InventoryReducer from './InventoryReducer'
import  TeacherReducer from './TeacherReducer'
import  EventScheduleReducer from './EventScheduleReducer'
import  ShopReducer from './ShopReducer'
import  ScheduleReducer from './ScheduleReducer'
import  VisibilityFilterReducer  from './VisibilityFilterReducer'
// import  InventoryReducer from './InventoryReducer'
import  TextReducer from './TextReducer'
import  LanguageReducer from './LanguageReducer'
import  CurrencyReducer from './CurrencyReducer'
import  StatusMessageReducer from './StatusMessageReducer'
import  DiscountReducer from './DiscountReducer'
import  StyleReducer from './StyleReducer'

const rootReducer = combineReducers({
  form:formReducer, // SPECIAL REDUCER FOR FORM (See import above)
  user:UserReducer,
  teachers:TeacherReducer,
  eventSchedule:EventScheduleReducer,
  products:ProductsReducer, 
  inventory:InventoryReducer, 
  shoppingCart:ShopReducer,
  schedule:ScheduleReducer,
  // inventory:InventoryReducer,
  text:TextReducer,
  visibilityFilter:VisibilityFilterReducer,
  filterKeys:FilterKeysReducer,
  language:LanguageReducer,
  currency:CurrencyReducer,
  statusMessage:StatusMessageReducer,
  discount:DiscountReducer,
  style:StyleReducer,
})

export default rootReducer