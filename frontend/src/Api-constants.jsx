const baseURL = "http://127.0.0.1:8000/"

const URL = {
    login_user : baseURL + 'users/api/login/user/',
    get_user : baseURL + 'users/api/get/user/',
    logout: baseURL + 'users/api/logout/',
    register: baseURL + 'users/api/register/user/',
    update_user: baseURL + 'users/api/update/user/'
};

export default URL;