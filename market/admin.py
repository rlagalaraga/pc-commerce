from django.contrib import admin
from market.models import Product,Review, ProductImages, Category

class ProductsAdmin(admin.ModelAdmin):
    list_display = (
                    'id',
                    'name',
                    'availability',
                    'quantity',
                    'price',
                    'productType',
                    'description',
                    'added',
                    'seller',)

admin.site.register(Product, ProductsAdmin)
admin.site.register(ProductImages)

class ReviewsAdmin(admin.ModelAdmin):
    pass

admin.site.register(Review, ReviewsAdmin)

class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'image',
        'description',
    )

admin.site.register(Category, CategoryAdmin)

# Register your models here.