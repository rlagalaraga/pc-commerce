from rest_framework.response import Response
from rest_framework import status, viewsets
from cart.models import Cart
from market.models import Product
from core.custom_permissions import IsAuthenticatedAndOwner
from cart.serializers import CartSerializer, CartUpdateSerializer, CartDisplaySerializer
from rest_framework.parsers import MultiPartParser, FormParser


class CartViewSet(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticatedAndOwner]

    def get_cartObject(self, buyer_id):
        try:
            return Cart.objects.get(id=buyer_id)
        except Cart.DoesNotExist:
            return None

    # Function for adding products to user cart
    def addto_cart(self, request, product_id, *args, **kwargs):
        # import pdb; pdb. set_trace()

        #Gets all cart products of user
        cartProduct = Cart.objects.filter(buyer = request.user.id)
        print(cartProduct)

        filtered = cartProduct.filter(product = product_id, is_sold=False).first()
        print(filtered)

        addedCartProd = Product.objects.filter(id = product_id).first()

        
        #Filters if added product already exists in the cart
        dupe_check =  cartProduct.filter(product = product_id).exists()
        sold_check = cartProduct.filter(product = product_id, is_sold=False)

        cartQ = int(request.data['cart_quantity'])
        productQ = addedCartProd.quantity - cartQ
        print("product quantity left is: ", productQ)


        print("cartQ: ", cartQ)

        #Check if unautherized users try to add cart
        if request.user.id is None:
            print("You must log in to add to cart!")
            return Response({"error": "You must log in add to cart!"}, status = status.HTTP_401_UNAUTHORIZED)

        #check if cart quantity added is 0
        if cartQ <= 0:
            print("Value should be greater than 0!")
            return Response(status=status.HTTP_400_BAD_REQUEST)

        #Check if after cart add, product stock does not return negative
        if productQ < 0:
            print("Error, you cannot order more of this item: " +addedCartProd.name+ " than it has in stock." )
            return Response("Stock of " +addedCartProd.name+ " will return negative quantity.", status=status.HTTP_400_BAD_REQUEST)


        else:
            # Check if added cart product is a duplicate and not checked out
            if dupe_check and sold_check:
                print("Cart Product is a Duplicate!")
                # dupe_prompt = "Cart Product is a Duplicate!"
                serializerUpdate = CartUpdateSerializer(filtered, data=request.data, partial=True)
                #Only updates cart quantity
                if serializerUpdate.is_valid():
                    addedQty = serializerUpdate.validated_data['cart_quantity']
                    total = filtered.cart_quantity + addedQty
                    print("New cart quantity is: ", total)

                    #Subtract product stock from cart quantity
                    filtered.product.quantity = productQ
                    filtered.product.save()
                    filtered.product.availability_check()

                    serializerUpdate.save(cart_quantity = total)
                    return Response(serializerUpdate.data, status = status.HTTP_200_OK)

            else:
                #Create a new cart object
                serializer = CartSerializer(data=request.data)
                if serializer.is_valid():

                    #Subtract product stock from cart quantity

                    addedCartProd.quantity = productQ
                    addedCartProd.save()
                    addedCartProd.availability_check()
                    
                    serializer.save(buyer=request.user, product=addedCartProd)
                    return Response(serializer.data, status = status.HTTP_201_CREATED)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    #Gets cart products
    def get_cart_products(self, request, user_id, *args, **kwargs):
        user = request.user.id

        if user == user_id:
            cartProduct = Cart.objects.filter(buyer_id = user_id, is_sold=False)
            if cartProduct:
                cartSerializer = CartDisplaySerializer(cartProduct, many=True)
                return Response(cartSerializer.data, status=status.HTTP_200_OK)
            
            else:
                print("There are no cart products for this user!")
                error = {"error": "There are no cart products for the given user."}
                return Response(error, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            print("You are not authorized to view this cart!")
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        

    #Deletes selected cart product if it exists
    def delete_cart_product(self, request, product_id, *args, **kwargs):
        #Filters all cart obj by user
        cart_instance = Cart.objects.filter(buyer_id = request.user.id)

        #Filters specific product in cart obj by user that is not sold
        cart = Cart.objects.filter(product = product_id, buyer_id = request.user.id, is_sold = False).first()

        #Queryset for product that quantity will be affected
        addedCartProd = Product.objects.filter(id = product_id).first()

        # Restores product quantity by the cart quantity it was reduced
        newProductQ = cart.cart_quantity + addedCartProd.quantity
        
        cartProduct_instance = cart_instance.filter(product = product_id, is_sold = False).first()

        if cart.buyer.id != request.user.id:
            print("You are not the owner of cart!")
            return Response({"res": "You are not the owner of the cart!"}, status = status.HTTP_400_BAD_REQUEST)
        
        else:
            addedCartProd.quantity = newProductQ
            addedCartProd.save()
            addedCartProd.availability_check()
            cartProduct_instance.delete()
            return Response({"res": "Cart Product Deleted!"}, status = status.HTTP_200_OK)