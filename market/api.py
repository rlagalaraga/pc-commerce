from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status, viewsets
from market.models import Product, ProductImages, Category, Review
from market.serializers import ProductSerializer, UpdateProductSerializer, ProductSellerSerializer, CategorySerializer, ReviewSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from core.custom_permissions import IsAuthenticatedAndOwner
from rest_framework.decorators import action

#Helper Method that loops through model to find product object with given id's
def get_productObject(self, product_id):
    try:
        return Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return None
    

class ReviewViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def get_all_reviews(self, request, *args, **kwargs):
        reviews = Review.objects.all()
        if reviews:
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get_reviews_by_product(self, request, *args, **kwargs):
        reviews = Review.objects.filter(product = self.kwargs['id'])
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CategoryViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def get_categories(self, request, *args, **kwargs):
        categories = Category.objects.all()
        if categories:
            serializer = CategorySerializer(categories, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_category_by_id(self, request, *args, **kwargs):
        category = Category.objects.get(id=self.kwargs['id'])
        serializer = CategorySerializer(category)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def get_category_by_name(self, request, *args, **kwargs):
        category = Category.objects.get(name=self.kwargs['name'])
        serializer = CategorySerializer(category)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    #Get all registered products
    def get_products(self, request, *args, **kwargs):
        #Display by latest product
        products = Product.objects.all().order_by('-added')
        if products:
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_products_by_category(self, request, *args, **kwargs):
        try:
            category = Category.objects.get(name=self.kwargs['category'])
        except Category.DoesNotExist:
            return Response("Category not found", status=status.HTTP_404_NOT_FOUND)
        
        products = Product.objects.filter(productType=category)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #Get products sold by specific user
    def get_user_product(self, request, product_id, format=None):   
        products = Product.objects.filter(seller_id=product_id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    #for product search
    def get_searchResult(self, request, *args, **kwargs):
        search_query = request.GET.get('keyterm', '')
        search_type = request.GET.get('productType', '')

        if search_type == 'product' and search_query != '':
            result = Product.objects.filter(name__icontains=search_query)
            serializer = ProductSellerSerializer(result, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        if search_type == 'category' and search_query != '':
            result = Product.objects.filter(productType__icontains=search_query)
            print('Category:', search_query, 'Products:', result)
            serializer = ProductSellerSerializer(result, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        else:
            serializer = ""
            return Response(serializer, status=status.HTTP_200_OK)

    def get_product_details(self, request, product_id, *args, **kwargs):
        wishlisted = False
        product_instance = get_productObject(self, product_id)
        if not product_instance:
            return Response(
                {"res": "Object with product id does not exist!"},
                status = status.HTTP_400_BAD_REQUEST
            )

        if product_instance.users_wishlist.filter(id=request.user.id).exists():
            wishlisted = True

        print(product_instance.users_wishlist.filter(id=request.user.id).exists())
        serializer = ProductSellerSerializer(product_instance)
        return JsonResponse({'data' : serializer.data, 'wishlisted' : wishlisted}, status=status.HTTP_200_OK)
    
    def get_product_by_id(self, request, *args, **kwargs):
        product = Product.objects.get(id=self.kwargs['id'])
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)




class LoggedProductViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsAuthenticatedAndOwner]

    @action(detail=False)
    #Add/Register New Product
    def register_product(self, request, *args, **kwargs):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(seller=request.user)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['PUT'])
    #Modifies product selected if it exists
    def modify_product(self, request, product_id):
        products = Product.objects.get(id=product_id)

        if products.seller_id == request.user.id:
            serializer = UpdateProductSerializer(products, data=request.data, partial=True)
            if serializer.is_valid():
                # check if availability is manually inputted by user
                if 'availability' in request.data:
                    serializer.save()

                    uploaded_images = request.FILES.getlist('images')
                    for image in uploaded_images:
                        ProductImages.objects.create(product=products, image=image)
                else:
                    serializer.save()

                    uploaded_images = request.FILES.getlist('images')
                    for image in uploaded_images:
                        ProductImages.objects.create(product=products, image=image)

                    products.availability_check()
                return Response(serializer.data, status = status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            print("You are not owner of the product!")
            return Response({"error": "You are not owner of the product!"}, status=status.HTTP_401_UNAUTHORIZED)      
    
    
    @action(detail=True)
    #Deletes selected product if it exists
    def delete_product(self, request, product_id, *args, **kwargs):
        product_instance = get_productObject(self, product_id)

        if product_instance.seller_id != request.user.id:
            print("You are not the owner of the product!")
            return Response(
                {"res": "You are not the owner of the product!"},
                status = status.HTTP_400_BAD_REQUEST
            )
        
        else:
            product_instance.delete()
            print("Product Deleted!")
            return Response({"res": "Product Deleted!"},status = status.HTTP_200_OK)


class WishlistViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsAuthenticatedAndOwner]

    @action(detail=True)
    #Function for wishlisting products per user
    def wishlist_product(self, request, product_id, *args, **kwargs):
        product_instance =  get_productObject(self, product_id)

        if product_instance.users_wishlist.filter(id=request.user.id).exists():
                product_instance.users_wishlist.remove(request.user)
        else:
            product_instance.users_wishlist.add(request.user)
        return Response(status = status.HTTP_200_OK)

    @action(detail=True)
    #Get user wishlisted products
    def get_wishlisted_products(self, request, user_id, *args, **kwargs):
        user = request.user.id

        if user == user_id:
            wishProducts = Product.objects.filter(users_wishlist = request.user.id)
            if wishProducts:
                serialized = ProductSellerSerializer(wishProducts, many=True)
                return Response(serialized.data, status=status.HTTP_200_OK)
            else:
                print("There are no wishlist products for this user!")
                error = {"error": "There are no wishlisted products for the given user."}
                return Response(error, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            print("You are not authorized to view this wishlist!")
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    
   
# class ReviewViewSet(viewsets.ViewSet):
#     #Helper Method that loops through model to find comments in a product
#     def get_comment_Object(self, product_id):
#         # import pdb; pdb.set_trace()
#         try:
#             return Review.objects.filter(product_id = product_id)
#         except Review.DoesNotExist:
#             return None
    
#     #Uses helper method to get comments data in a product
#     def get_product_comments(self,request, *args, **kwargs):
#         # import pdb; pdb.set_trace()
#         comment_instance = self.get_comment_Object(self.kwargs.get('product_id'))
#         if not comment_instance:
#             return Response(
#                 {"res": "Comment Object does not Exist!"},
#                 status = status.HTTP_400_BAD_REQUEST
#             )
#         serializer = ReviewSerializer(comment_instance, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     #Comments Function
#     def add_comment(self, request, *args, **kwargs):
#         data = {
#             'comment': request.data.get('comment'),
#             'author': request.user.id
#         }
#         serializer = ReviewSerializer(data=data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status = status.HTTP_201_CREATED)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    