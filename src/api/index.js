import requests from './requests'

// https://api-project9.lotusflare.com/api/v3/user/login
// https://api-project9.lotusflare.com/api/v3/user/get_account
// https://api-project9.lotusflare.com/api/v3/user/get_user
// https://api-project9.lotusflare.com/api/v3/user/add_account
// https://api-project9.lotusflare.com/api/v3/user/add_address
// https://api-project9.lotusflare.com/api/v3/user/add_subscriber/

// https://api-project9.lotusflare.com/api/v3/orderoe/create_order

// https://api-project9.lotusflare.com/api/v3/catalog/get_offers

/**
 *
    application_id: '05d8ab7fc9884950b6f90cad61dc88aa',
    login_type: 1,
    // login_id: 'email573312093431@domain.com',
    login_id: this.login,
    login_secret: this.password,
    // login_secret: 'secret573312093431secret',
    device_id: 'device_id_5209',
 */
export const userLogin = (application_id, login_type, login_id, login_secret, device_id) =>
    requests({
        url: '/user/login',
        method: 'post',
        data: {
            application_id,
            login_type,
            login_id,
            login_secret,
            device_id,
        },
    })

//get offers
export const getOffers = (operator_name) =>
    requests({
        url: '/catalog/get_offers',
        method: 'post',
        data: {
            operator_name,
        },
    })
