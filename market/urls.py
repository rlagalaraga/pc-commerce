from django.urls import path
# from market import views
from market import api

app_name = "market"

urlpatterns = [
    #API urls
    path('api/get/products/', api.ProductViewSet.as_view({'get':'get_products'})),
    path('api/get/user/product/<int:product_id>/', api.ProductViewSet.as_view({'get':'get_user_product'})),
    path('api/get/productDetails/<int:product_id>/', api.ProductViewSet.as_view({'get':'get_productDetails'})),
    path('api/get/searchResult/', api.ProductViewSet.as_view({'get':'get_searchResult'})),
    path('api/get/products/<str:category>/', api.ProductViewSet.as_view({'get':'get_products_by_category'})),
    path('api/get/product/<int:id>/', api.ProductViewSet.as_view({'get':'get_product_by_id'})),

    path('api/wishlist/product/<int:product_id>/', api.WishlistViewSet.as_view({'post':'wishlist_product'})),
    path('api/get/wishlisted/products/<int:user_id>/', api.WishlistViewSet.as_view({'get':'get_wishlisted_products'})),

    path('api/register/product/', api.LoggedProductViewSet.as_view({'post':'register_product'})),
    path('api/modify/product/<int:product_id>/', api.LoggedProductViewSet.as_view({'put':'modify_product'})),
    path('api/delete/product/<int:product_id>/', api.LoggedProductViewSet.as_view({'delete':'delete_product'})),

    path('api/get/categories/', api.CategoryViewSet.as_view({'get':'get_categories'})),
    path('api/get/category/<int:id>/', api.CategoryViewSet.as_view({'get':'get_category_by_id'})),
    path('api/get/category/<str:name>/', api.CategoryViewSet.as_view({'get':'get_category_by_name'})),

    path('api/get/reviews/', api.ReviewViewSet.as_view({'get':'get_all_reviews'})),
    path('api/get/reviews/<int:id>/', api.ReviewViewSet.as_view({'get':'get_reviews_by_product'}))

    #Review API
    # path('api/get_comment_Object/<int:product_id>/', api.ReviewViewSet.as_view({'get':'get_comment_Object'})),
    # path('api/get_product_comments/<int:product_id>/', api.ReviewViewSet.as_view({'get':'get_product_comments'})),
    # path('api/add_comment/<int:product_id>/', api.ReviewViewSet.as_view({'post':'add_comment'})),

]