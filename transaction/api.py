from rest_framework.response import Response
from rest_framework import status, viewsets
from django.db.models import Max
from . models import Transaction, Product
from cart.models import CartItem
from rest_framework import permissions
from core.custom_permissions import IsAuthenticatedAndOwner
from transaction.serializers import TransactionSerializer

class TransactionViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticatedAndOwner]

    def get_transactions(self, request, *args, **kwargs):
        items = Transaction.objects.filter(buyer=request.user)
        serializer = TransactionSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def checkout(self, request, *args, **kwargs):
        serializer = TransactionSerializer(data=request.data)
        item = CartItem.objects.get(id=self.kwargs['id'])
        if serializer.is_valid():
            serializer.save(buyer=request.user, product=item.product, quantity=item.quantity, price=item.product.price * item.quantity)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

