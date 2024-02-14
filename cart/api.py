from rest_framework.response import Response
from rest_framework import status, viewsets
from cart.models import CartItem
from market.models import Product
from rest_framework.permissions import IsAuthenticated, AllowAny
from core.custom_permissions import IsAuthenticatedAndOwner, IsAuthenticatedAndBuyer
from cart.serializers import CartSerializer


class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticatedAndBuyer]

    def get_cart_items(self, request, *args, **kwargs):
        items = CartItem.objects.filter(buyer=request.user)
        serializer = CartSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def edit_quantity(self, request, *args, **kwargs):
        item = CartItem.objects.get(id=self.kwargs['id'], buyer=request.user)
        # product = Product.objects.get(id=item.product)
        # print(product)
        serializer = CartSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def remove_item (self, request, *args, **kwargs):
        try:
            item = CartItem.objects.get(id=self.kwargs['id'], buyer=request.user)
            item.delete()
            return Response({"message": "CartItem deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response({"message": "CartItem does not exist"}, status=status.HTTP_404_NOT_FOUND)


class AddToCartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def add_to_cart(self, request, *args, **kwargs):

        try:
            item = CartItem.objects.get(product=self.kwargs['id'], buyer=request.user)
            serializer = CartSerializer(item, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save(quantity=item.quantity + 1)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except CartItem.DoesNotExist:
            serializer = CartSerializer(data=request.data, partial=True)
            product = Product.objects.get(id=self.kwargs['id'])
            if serializer.is_valid():
                serializer.save(buyer=request.user, product=product)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)