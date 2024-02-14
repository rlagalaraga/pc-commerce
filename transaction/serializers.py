from rest_framework import serializers
from .models import Transaction
from market.models import ProductImages

class ProductImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = ('image',)

class TransactionSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    prod_name = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = '__all__'

    def get_price(self, obj):
        return obj.product.price * obj.quantity
    
    def get_images(self, obj):
        product_images = obj.product.images.all() if obj.product else None
        serializer = ProductImagesSerializer(product_images, many=True)
        return serializer.data
    
    def get_prod_name(self, obj):
        return obj.product.name