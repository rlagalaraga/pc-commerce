from rest_framework.response import Response
from rest_framework import status, viewsets
from django.db.models import Max
from . models import Cart, Transaction, Product
from rest_framework import permissions
from core.custom_permissions import IsAuthenticatedAndOwner
from transaction.serializers import TransactionSerializer, TransactionDisplaySerializer
from rest_framework.parsers import MultiPartParser, FormParser

class TransactionViewSet(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticatedAndOwner]

    def get_transaction(self, request, user_id, *args, **kwargs):
        if user_id != request.user.id:
            print("You are not authorized to view other transactions!")
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        transaction_items = Transaction.objects.filter(transaction_buyer = user_id)

        if transaction_items and user_id == request.user.id:
            transactionSerializer = TransactionDisplaySerializer(transaction_items, many=True)
            return Response(transactionSerializer.data, status = status.HTTP_200_OK)
        
        if transaction_items == '' and user_id == request.user.id:
            print("You don't have any transactions yet!")
            return Response(status=status.HTTP_204_NO_CONTENT)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def create_transaction(self, request, user_id, *args, **kwargs):
        cart_items = Cart.objects.filter(buyer_id=user_id, is_sold=False)
        
        if user_id == None or request.user.id == None:
            print("You must login to create transactions!")
            return Response("You must login to create transactions!", status=status.HTTP_401_UNAUTHORIZED)

        if user_id != request.user.id:
            print("You are not authorized to create this transaction!")
            return Response("You are not authorized to create this transaction!", status=status.HTTP_401_UNAUTHORIZED)
        
        if not cart_items:
            print("cart is empty!")
            return Response("Cart is empty!", status=status.HTTP_204_NO_CONTENT)

        transaction_items = []

        for item in cart_items:
            transaction_items.append(Transaction(
                transaction_item = item,
                transaction_buyer = request.user,
                transaction_quantity = item.cart_quantity,
                subtotal = item.product.price * item.cart_quantity,
            ))


        if transaction_items:
            max_number_identifier = Transaction.objects.aggregate(max_number=Max('number_identifier'))['max_number'] or 0
            number_identifier = max_number_identifier + 1

            # Set the same number_identifier for all the transaction items
            for transaction_item in transaction_items:
                transaction_item.number_identifier = number_identifier
                transaction_item.save()
            
            #If True, checked out cart_items wont be visible to user cart again
            cart_items.update(is_sold=True)

            serializer = TransactionSerializer(transaction_items, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response("No cart items found.", status=status.HTTP_400_BAD_REQUEST)




