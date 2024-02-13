from rest_framework import serializers
from .models import Product, ProductImages, Category, Review

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField (
        child = serializers.ImageField(max_length = 1000000, allow_empty_file = False, use_url = False),
        write_only=True
    )

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
            'uploaded_images',
            # 'image',
            'averageRating',
            'availability',
            'quantity',
            'id'
        )

    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        product = Product.objects.create(**validated_data)

        for image in uploaded_images:
           newproduct_image = ProductImages.objects.create(product=product, image=image)
        
        return product

class ProductSellerSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    sName = serializers.CharField(source = 'seller.get_full_name')
    class Meta:
        model = Product
        # fields = '__all__'
        fields = (
            'name',
            'price',
            'productType',
            'description',
            'added',
            'seller',
            'sName',
            'images',
            'averageRating',
            'availability',
            'quantity',
            'id',
        )

# class ReviewSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Review
#         fields = '__all__'

class UpdateProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, required=False)
    class Meta:
        model = Product
        # coverImage = serializers.ImageField(required=False)
        fields = (
            'name',
            'productType',
            'description',
            # 'image',
            'images',
            'quantity',
            'availability',
            'price',
        )

    
class ReviewSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = (
            'id',
            'product',
            'author',
            'author_name',
            'date_added',
            'rating',
            'comment',
        )

    def get_author_name(self, obj):
        author = obj.author
        if author:
            return author.get_full_name()
        return None
