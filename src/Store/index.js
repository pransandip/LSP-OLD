import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
    watchHomeProcessServices
  } from '../Sagas';
 import rootReducer from '../reducers';

const initialState = {};


const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(sagaMiddleware),
    );
     sagaMiddleware.run(watchHomeProcessServices);
    return store;
}

export default configureStore;