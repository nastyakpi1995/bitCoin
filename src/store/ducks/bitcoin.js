import { takeLatest } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';

//actione
export const SET_LIST = 'SET_LIST';
export const GET_PRODUCTS_FROM_SERVER = 'GET_PRODUCTS_FROM_SERVER';

// state
export const initialState = {
  bitcoinData: [],
};

export function* getDataProduct() {
  const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
  try {
    const data = yield call(() => {
      return fetch(url)
        .then(res => res.json())
    })  
      yield put({ type:SET_LIST, data })
  } catch (error) {
      console.error('fetchUsers return erros: ' + error);
  }
}

//dispatch
export const requestForProducts = () => ({ type: GET_PRODUCTS_FROM_SERVER });

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST:
      //move to another func
      return {
        ...state,
        bitcoinData: action.data,
      };

    default:
      return state;
  }
};

export function* fetchSaga() {
  yield takeLatest(GET_PRODUCTS_FROM_SERVER, getDataProduct)
}


export default reducer;