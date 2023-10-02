from django.urls import path
from transaction import views
from transaction import api

app_name = "transaction"

urlpatterns = [
    # API urls
    path('api/create_transaction/<int:user_id>/', api.TransactionViewSet.as_view({'post':'create_transaction'})),
    path('api/get_transaction/<int:user_id>/', api.TransactionViewSet.as_view({'get':'get_transaction'})),
    # path('api/delete_cart_product/<int:product_id>/', apis.CartViewSet.as_view({'delete':'delete_cart_product'})),
    # path('api/test/', apis.CartViewSet.as_view({'get':'test'})),

    # Views urls
    # path('transaction/<int:user_id>/', views.ViewTransactions.as_view(), name="transaction"),
    # path('cart/deleteCartConfirm/<int:product_id>/', views.DeleteCartProductView.as_view(), name="deleteCartConfirm"),

]