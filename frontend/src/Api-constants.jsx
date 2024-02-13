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
    get_reviews: baseURL + 'market/api/get/reviews/',
    get_cart_items: baseURL + 'cart/api/items/',
    add_to_cart: baseURL + 'cart/api/add/item/',
    cart_item: baseURL + 'cart/api/item/',
};

export { baseURL, URL };