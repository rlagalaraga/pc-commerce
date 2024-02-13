from django.urls import path
from cart import views
from cart import api

app_name = "cart"

urlpatterns = [
    #API urls
    path('api/items/', api.CartViewSet.as_view({
        'get':'get_cart_items'
    })),
    path('api/item/<int:id>/', api.CartViewSet.as_view({
        'put': 'edit_quantity',
        'delete': 'remove_item'
    })),
    path('api/add/item/<int:id>/', api.AddToCartViewSet.as_view({
        'post': 'add_to_cart',
    })),
]