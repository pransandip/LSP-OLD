import { call, put } from 'redux-saga/effects';
import {
    fetchUserAuthentication,
    fetchAuftragData,
    saveOderDetailDataToDB,
    fetchFirstWeightData,
    saveSecondOderDetailDataToDB,
} from '../api/HomeProcessApi';

import * as actions from '../actions/index';

/***************** - GET AUTH CODE SAGA - *************************/
export function* fetchUserAuthTokenSaga(action) {
    try {
        const authCode = yield call(fetchUserAuthentication, action.payload.auth_data);
        yield put(actions.getAuthTokenSuccess(authCode));
    } catch (error) {
        yield put(actions.getServicesError(error.toString()));
    }

}

/***************** - GET AUFTRAG SAGA - *************************/
export function* fetchAuftragSaga(action) {
    try {
        const AuftragData = yield call(fetchAuftragData, action.payload.auftrag_data);
        yield put(actions.getAuftragDataSuccess(AuftragData));
    } catch (error) {
        yield put(actions.getServicesError(error.toString()));
    }

}

/***************** - GET FIRST WEIGHT DATA SAGA - *************************/
export function* fetchFirstWeightDataSaga(action) {
    try {
        const FirstWeightgData = yield call(fetchFirstWeightData, action.payload.yard_ticket, action.payload.auth_token);
        yield put(actions.getFirstWeightDataSuccess(FirstWeightgData));
    } catch (error) {
        yield put(actions.getServicesError(error.toString()));
    }

}

/***************** - SAVE ORDER DETAIL SAGA - *************************/
export function* saveOrderDetailSaga(action) {
    try {
        const orderDetailStatus = yield call(saveOderDetailDataToDB, action.payload.order_detail_data);
        yield put(actions.saveOrderDetailDataSuccess(orderDetailStatus));
    } catch (error) {
        yield put(actions.getServicesError(error.toString()));
    }

}

/***************** - SAVE SECOND ORDER DETAIL SAGA - *************************/
export function* saveSecondOrderDetailSaga(action) {
    try {
        const orderDetailStatus = yield call(saveSecondOderDetailDataToDB, action.payload.order_detail_data);
        yield put(actions.saveSecondOrderDetailDataSuccess(orderDetailStatus));
    } catch (error) {
        yield put(actions.getServicesError(error.toString()));
    }

}
