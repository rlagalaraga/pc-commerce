from django.contrib import admin
from cart.models import Product, CartItem

class CartAdmin(admin.ModelAdmin):
    list_display = (
                    'id',
                    'product',
                    'buyer',
                    'date_added',
                    'quantity',)

admin.site.register(CartItem, CartAdmin)
# admin.site.register(ProductImages)

# Register your models here.
