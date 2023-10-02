from django.urls import path
from cart import views
from cart import api

app_name = "cart"

urlpatterns = [
    #API urls
    path('api/addto_cart/<int:product_id>/', api.CartViewSet.as_view({'post':'addto_cart'})),
    path('api/get_cart_products/<int:user_id>/', api.CartViewSet.as_view({'get':'get_cart_products'})),
    path('api/delete_cart_product/<int:product_id>/', api.CartViewSet.as_view({'delete':'delete_cart_product'})),

    #Views urls
    # path('view-cart/<int:user_id>/', views.CartView.as_view(), name="view-cart"),
    # path('view-cart/delete-cart-prod-confirm/<int:product_id>/', views.DeleteCartProductView.as_view(), name="delete-cart-prod-confirm"),

]