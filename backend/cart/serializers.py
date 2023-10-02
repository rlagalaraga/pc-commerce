from rest_framework import serializers
from .models import Product, Cart, ProductImages

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class CartDisplaySerializer(serializers.ModelSerializer):
    cartP_image = serializers.SerializerMethodField()

    cartP_id = serializers.IntegerField(source='product.id')
    cartP_name = serializers.CharField(source='product.name')
    cartP_price = serializers.FloatField(source='product.price')
    cartP_desc = serializers.CharField(source='product.description')
    cartP_seller = serializers.CharField(source='product.seller.get_full_name')
    
    class Meta:
        model = Cart
        fields = ('cartP_name', 'cartP_desc', 
                  'cartP_image', 'cartP_seller', 
                  'date_added', 'cart_quantity',
                  'cartP_price', 'cartP_id',
                  'product','buyer','is_sold',
                  'date_added','cart_quantity')
    
    def get_cartP_image(self, obj):
        # Fetch the product image associated with the cart item
        try:
            #Filter from image list and return first image
            product_image = ProductImages.objects.filter(product=obj.product)
            firstImage = product_image.first()
            return firstImage.image.url
        except ProductImages.DoesNotExist:
            return None

class CartUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['cart_quantity']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = (
            'name',
            'price',
            'productType',
            'description',
            'added',
            'seller',
            'images',
            'averageRating',
            'availability',
            'quantity',
            'id'
        )

class ProductSellerSerializer(serializers.ModelSerializer):
    seller = serializers.CharField(source = 'seller.get_full_name')
    class Meta:
        model = Product
        fields = '__all__'