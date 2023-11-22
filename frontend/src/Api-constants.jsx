const baseURL = "http://127.0.0.1:8000/"

const URL = {
    login_user : baseURL + 'users/api/login/user/',
    get_user : baseURL + 'users/api/get/user/',
    logout: baseURL + 'users/api/logout/',
    register: baseURL + 'users/api/register/user/',
    update_user: baseURL + 'users/api/update/user/',
    get_categories: baseURL + 'market/api/get/categories/',
    get_category: baseURL + 'market/api/get/category/',
    get_products: baseURL + 'market/api/get/products/',
    get_product: baseURL + 'market/api/get/product/',
};

export default URL;