from rest_framework import serializers
from .models import CartItem
from market.models import ProductImages

class ProductImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = ('image',)

class CartSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    prod_name = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = '__all__'
    
    def get_price(self, obj):
        return obj.product.price * obj.quantity
    
    def get_images(self, obj):
        product_images = obj.product.images.all() if obj.product else None
        serializer = ProductImagesSerializer(product_images, many=True)
        return serializer.data
    
    def get_prod_name(self, obj):
        return obj.product.name


# class CartDisplaySerializer(serializers.ModelSerializer):
#     cartP_image = serializers.SerializerMethodField()

#     cartP_id = serializers.IntegerField(source='product.id')
#     cartP_name = serializers.CharField(source='product.name')
#     cartP_price = serializers.FloatField(source='product.price')
#     cartP_desc = serializers.CharField(source='product.description')
#     cartP_seller = serializers.CharField(source='product.seller.get_full_name')
    
#     class Meta:
#         model = Cart
#         fields = ('cartP_name', 'cartP_desc', 
#                   'cartP_image', 'cartP_seller', 
#                   'date_added', 'cart_quantity',
#                   'cartP_price', 'cartP_id',
#                   'product','buyer','is_sold',
#                   'date_added','cart_quantity')
    
#     def get_cartP_image(self, obj):
#         # Fetch the product image associated with the cart item
#         try:
#             #Filter from image list and return first image
#             product_image = ProductImages.objects.filter(product=obj.product)
#             firstImage = product_image.first()
#             return firstImage.image.url
#         except ProductImages.DoesNotExist:
#             return None

# class CartUpdateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Cart
#         fields = ['cart_quantity']


# class ProductSerializer(serializers.ModelSerializer):
#     images = ProductImageSerializer(many=True, read_only=True)

#     class Meta:
#         model = Product
#         fields = (
#             'name',
#             'price',
#             'productType',
#             'description',
#             'added',
#             'seller',
#             'images',
#             'averageRating',
#             'availability',
#             'quantity',
#             'id'
#         )

# class ProductSellerSerializer(serializers.ModelSerializer):
#     seller = serializers.CharField(source = 'seller.get_full_name')
#     class Meta:
#         model = Product
#         fields = '__all__'