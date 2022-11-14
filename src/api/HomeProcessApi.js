import ServiceEngine from '../Services/ServiceEngine';
import environment from '../Environment/Environment';

/************ To fetch Authentication token ******************/
export const fetchUserAuthentication = async (authData) => {
    let body = {};
    body = {
        username: authData.username,
        password: authData.password
    };
    let service = new ServiceEngine(
        'POST',
        `/api-token-auth/`,
        false,
        environment.API_BASEURL,
        '',
    );
    try {
        return service
            .doAxiosAuthPost(body)
            .then((response) => {
                return response;
            })
    } catch (error) {
        console.log(error);
    }
};

/************ To fetch Auftrag data ******************/
export const fetchAuftragData = async (auftrag) => {
    let body = {};
    body = {
        client_id: auftrag.client_id,
        password: auftrag.password,
        user_id: auftrag.user_id,
        order_id: auftrag.order_id
    };
    let service = new ServiceEngine(
        'POST',
        `/api/GetOrderDetails/`,
        false,
        environment.API_BASEURL,
        '',
        '',
        '',
        auftrag.auth_token
    );
    try {
        return service
            .doAxiosPost(body)
            .then((response) => {
                return response;
            })
    } catch (error) {
        console.log(error);
    }
};

/************ To fetch First Weight data ******************/
export const fetchFirstWeightData = async (yardTicket, authToken) => {
    let service = new ServiceEngine(
        'GET',
        `/api/OrderDetails/?yard_ticket=` + yardTicket,
        false,
        environment.API_BASEURL,
        '',
        '',
        '',
        authToken
    );

    try {
        let response = await service.doAxiosGet();
        
        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
};

/************ To Save Order detail data ******************/
export const saveOderDetailDataToDB = async (orderDetailData) => {
    let body = {};
    body = {
        "avv_number": orderDetailData.avv_number,
        "order_number": orderDetailData.order_number,
        "bef_ansp": orderDetailData.bef_ansp,
        "bef_name": orderDetailData.bef_name,
        "bef_number": orderDetailData.bef_number,
        "erz_ansp": orderDetailData.erz_ansp,
        "erz_name": orderDetailData.erz_name,
        "erz_number": orderDetailData.erz_number,
        "import_export": orderDetailData.import_export,
        "disposal_facility": orderDetailData.disposal_facility,
        "kunde_ansp": orderDetailData.kunde_ansp,
        "kunde_name": orderDetailData.kunde_name,
        "kunde_number": orderDetailData.kunde_number,
        "order_validity": orderDetailData.order_validity,
        "process_code": orderDetailData.process_code,
        "variety_denomination": orderDetailData.variety_denomination,
        "variety_number": orderDetailData.variety_number,
        "tara_image_1": orderDetailData.tara_image_1,
        "tara_image_2": orderDetailData.tara_image_2,
        "tara_datetime": orderDetailData.tara_datetime,
        "tara_to": orderDetailData.tara_to,
        "tara_cradel_number": orderDetailData.tara_cradel_number,
        "driver_name": orderDetailData.driver_name,
        "license_plate": orderDetailData.license_plate,
        "check_yard_list": true,
        "created_on": orderDetailData.created_on
    };
    let service = new ServiceEngine(
        'POST',
        `/api/OrderDetails/`,
        false,
        environment.API_BASEURL,
        '',
        '',
        '',
        orderDetailData.authToken
    );
    try {
        return service
            .doAxiosPost(body)
            .then((response) => {
                return response;
            })
    } catch (error) {
        console.log(error);
    }
};

/************ To Save Second Weighing Order detail data ******************/
export const saveSecondOderDetailDataToDB = async (orderDetailData) => {
    let body = {};
    body = {
        "client_id": orderDetailData.client_id,
        "password": orderDetailData.password,
        "user_id": orderDetailData.user_id,
        "order_number": orderDetailData.order_number,
        "gross_datetime": orderDetailData.gross_datetime,
        "gross_to": orderDetailData.gross_to,
        "gross_cradel_number": orderDetailData.gross_cradel_number,
        "yard_ticket": orderDetailData.yard_ticket,
        "license_plate": orderDetailData.license_plate,
        "tara_datetime": orderDetailData.tara_datetime,
        "tara_to": orderDetailData.tara_to,
        "tara_cradel_number": orderDetailData.tara_cradel_number,
        "signature": '',
        "gross_image_1": orderDetailData.gross_image_1,
        "gross_image_2": orderDetailData.gross_image_2,
        "check_yard_list" : orderDetailData.check_yard_list
    };
    let service = new ServiceEngine(
        'PUT',
        `/api/OrderDetails/`+orderDetailData.id +'/',
        false,
        environment.API_BASEURL,
        '',
        '',
        '',
        orderDetailData.authToken
    );
    try {
        return service
            .doAxiosPut(body)
            .then((response) => {
                return response;
            })
    } catch (error) {
        console.log(error);
    }
};
