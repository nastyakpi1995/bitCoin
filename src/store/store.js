import {createStore , combineReducers , applyMiddleware } from 'redux';
import createSagaMiddleware  from 'redux-saga';
import reducer, { fetchSaga } from './ducks/bitcoin';

const sagaMiddleware = createSagaMiddleware();

let store = createStore(combineReducers({
  listBitcoin: reducer,
}) , applyMiddleware(sagaMiddleware));

sagaMiddleware.run(fetchSaga)

export default store;