from django.contrib import admin
from transaction.models import Transaction

class TransactionAdmin(admin.ModelAdmin):
    list_display = (
                    'id',
                    'product',
                    'buyer',
                    'quantity',
                    'price',
                    'checkout_date')

admin.site.register(Transaction, TransactionAdmin)

# Register your models here.
