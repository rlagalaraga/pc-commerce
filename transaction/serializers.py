from rest_framework import serializers
from cart.serializers import CartSerializer
from .models import Product, CustomUser, CartItem, Transaction, ProductImages

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class TransactionDisplaySerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='transaction_item.product')
    product_image = serializers.SerializerMethodField()
    buyer_name = serializers.CharField(source='transaction_buyer.username')
    seller_name = serializers.CharField(source='transaction_item.product.seller.get_full_name')

    class Meta:
        model = Transaction
        fields = ('number_identifier', 'product_name', 
                  'product_image', 'seller_name', 
                  'transaction_quantity', 'subtotal', 
                  'buyer_name', 'checkout_date')
    
    def get_product_image(self, obj):
        # Fetch the product image associated with the transaction item
        try:
            #Filter from image list and return first image
            product_image = ProductImages.objects.filter(product=obj.transaction_item.product)
            firstImage = product_image.first()
            return firstImage.image.url
        except ProductImages.DoesNotExist:
            return None


class ProductSellerSerializer(serializers.ModelSerializer):
    seller = serializers.CharField(source = 'seller.get_full_name')
    class Meta:
        model = Product
        fields = '__all__'