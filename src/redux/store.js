import {createStore,combineReducers,applyMiddleware } from 'redux'
import dormis from './reducers/mainReducer'
import createSagaMiddleware from 'redux-saga'

//Sagas
import rootSaga from './sagas'
const sagaMiddleware = createSagaMiddleware()
const store= createStore(dormis,applyMiddleware(sagaMiddleware))


sagaMiddleware.run(rootSaga)
export default store