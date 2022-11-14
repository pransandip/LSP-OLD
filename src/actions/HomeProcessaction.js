import { actionTypes } from '../Constants/Constants';

export const getAuthTokenRequest = (authData) => {
    return {
        type: actionTypes.GET_AUTH_TOKEN_REQUEST,
        payload:{
            auth_data: authData
        },
        isAuthTokenLoading: true
    }
};

export const getAuthTokenSuccess = (authToken) => {
    return {
        type: actionTypes.GET_AUTH_TOKEN_SUCCESS,
        user_auth_token: authToken,
        isAuthTokenLoading: false
    }
};

export const getServicesError = (error) => {
    return {
        type: actionTypes.FETCH_SERVICES_ERROR,
        ServiceDataFetchError: error
    }
};

export const getAuftragDataRequest = (auftragData) =>{
    return {
        type : actionTypes.GET_AUFTRAG_DATA_REQUEST,
        payload:{
            auftrag_data : auftragData
        },
        isAuftragDataLoading: true
    }
};

export const getAuftragDataSuccess = (auftragData) => {
    return {
        type: actionTypes.GET_AUFTRAG_DATA_SUCCESS,
        auftrag_data: auftragData,
        isAuftragDataLoading: false
    }
};

export const getFirstWeightDataRequest = (yardTicket, auth_token) => {
    return {
        type : actionTypes.GET_FIRST_WEIGHT_DATA_REQUEST,
        payload:{
            yard_ticket : yardTicket,
            auth_token: auth_token
        },
        isFirstWeightDataLoading: true
    }
};

export const getFirstWeightDataSuccess = (firstWeightData) => {
    return {
        type: actionTypes.GET_FIRST_WEIGHT_DATA_SUCCESS,
        first_weight_data: firstWeightData,
        isFirstWeightDataLoading: false
    }
};

export const saveSecondOrderDetailDataRequest = (orderDetailSecondData) => {
    return {
        type: actionTypes.SAVE_SECOND_ORDER_DETAIL_DATA_REQUEST,
        payload:{
            order_detail_data: orderDetailSecondData
        },
        isSecondOrderDetailDataLoading: true
    }
};

export const saveSecondOrderDetailDataSuccess = (orderDetailData) =>{
    return{
        type: actionTypes.SAVE_SECOND_ORDER_DETAIL_DATA_SUCCESS,
        order_second_detail_data: orderDetailData,
        isSecondOrderDetailDataLoading: false
    }
};

export const saveOrderDetailDataRequest = (orderDetailData) =>{
    return{
        type: actionTypes.SAVE_ORDER_DETAIL_DATA_REQUEST,
        payload:{
            order_detail_data: orderDetailData
        },
        isOrderDetailDataLoading: true
    }
};

export const saveOrderDetailDataSuccess = (orderDetailData) =>{
    return{
        type: actionTypes.SAVE_ORDER_DETAIL_DATA_SUCCESS,
        order_detail_data: orderDetailData,
        isOrderDetailDataLoading: false
    }
};

export const getAllOrderDetailDataRequest = (orderDetailData) =>{
    return{
        type: actionTypes.GET_ALL_ORDER_DETAIL_DATA_REQUEST,
        payload:{
            order_detail_data: orderDetailData
        },
        isAllOrderDetailDataLoading: true
    }
};

export const getAllOrderDetailDataSuccess = (orderDetailData) =>{
    return{
        type: actionTypes.GET_ALL_ORDER_DETAIL_DATA_SUCCESS,
        all_order_detail_data: orderDetailData,
        isAllOrderDetailDataLoading: false
    }
};

