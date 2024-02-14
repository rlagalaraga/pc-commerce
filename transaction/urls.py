from django.urls import path
from transaction import views
from transaction import api

app_name = "transaction"

urlpatterns = [
    # API urls
    path('api/checkout/<int:id>/', api.TransactionViewSet.as_view({'post':'checkout'})),
    path('api/get/', api.TransactionViewSet.as_view({'get':'get_transactions'})),
]