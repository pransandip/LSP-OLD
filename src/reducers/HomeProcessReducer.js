import { actionTypes } from '../Constants/Constants';

const initialState = {
    isLoading: false,
};

export const HomeProcessReducers = (state = initialState, action) => {
    switch (action.type) {

        /***************** - get Auth Code Reducer - *************************/
        case actionTypes.GET_AUTH_TOKEN_REQUEST:
            return { ...state, isAuthTokenLoading: action.isAuthTokenLoading };

        case actionTypes.GET_AUTH_TOKEN_SUCCESS:
            return {
                ...state,
                user_auth_token: action.user_auth_token,
                isAuthTokenLoading: false
            };

        /***************** - get Auftrag value Reducer - *************************/
        case actionTypes.GET_AUFTRAG_DATA_REQUEST:
            return { ...state, isAuftragDataLoading: action.isAuftragDataLoading };

        case actionTypes.GET_AUFTRAG_DATA_SUCCESS:
            return {
                ...state,
                auftrag_data: action.auftrag_data,
                isAuftragDataLoading: false
            };

        /***************** - get First Weight Data Reducer - *************************/
        case actionTypes.GET_FIRST_WEIGHT_DATA_REQUEST:
            return { ...state, isFirstWeightDataLoading: action.isFirstWeightDataLoading };

        case actionTypes.GET_FIRST_WEIGHT_DATA_SUCCESS:
            return {
                ...state,
                first_weight_data: action.first_weight_data,
                isFirstWeightDataLoading: false
            };

        /***************** - save Order detail status Reducer - *************************/
        case actionTypes.SAVE_ORDER_DETAIL_DATA_REQUEST:
            return { ...state, isOrderDetailDataLoading: action.isOrderDetailDataLoading };

        case actionTypes.SAVE_ORDER_DETAIL_DATA_SUCCESS:
            return {
                ...state,
                order_detail_data: action.order_detail_data,
                isOrderDetailDataLoading: false
            };

        /***************** - save Second Order detail status Reducer - *************************/
        case actionTypes.SAVE_SECOND_ORDER_DETAIL_DATA_REQUEST:
            return { ...state, isSecondOrderDetailDataLoading: action.isSecondOrderDetailDataLoading };

        case actionTypes.SAVE_SECOND_ORDER_DETAIL_DATA_SUCCESS:
            return {
                ...state,
                order_second_detail_data: action.order_second_detail_data,
                isSecondOrderDetailDataLoading: false
            };

        /***************** - get all Order detail Reducer - *************************/
        case actionTypes.GET_ALL_ORDER_DETAIL_DATA_REQUEST:
            return { ...state, isAllOrderDetailDataLoading: action.isAllOrderDetailDataLoading };

        case actionTypes.GET_ALL_ORDER_DETAIL_DATA_SUCCESS:
            return {
                ...state,
                all_order_detail_data: action.all_order_detail_data,
                isAllOrderDetailDataLoading: false
            };
        default:
            return state;
    }
};