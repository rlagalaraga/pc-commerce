from django.contrib import admin
from cart.models import Product, Cart, ProductImages

class CartAdmin(admin.ModelAdmin):
    list_display = (
                    'id',
                    'product',
                    'buyer',
                    'date_added',
                    'is_sold',
                    'cart_quantity',)

admin.site.register(Cart, CartAdmin)
# admin.site.register(ProductImages)

# Register your models here.
