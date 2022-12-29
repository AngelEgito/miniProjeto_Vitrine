import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import {reducer, reducerAmountCart} from './reducer'
import rootSaga from './rootSaga'


const sagaMiddleware = createSagaMiddleware()


const reducers = combineReducers({
  clickCart: reducer,
  clickAmount: reducerAmountCart,
});


const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)


sagaMiddleware.run(rootSaga)

export default store;