from django.db import models
from users.models import CustomUser
from market.models import Product, ProductImages
from cart.models import CartItem
from django.core.validators import MinValueValidator

class Transaction(models.Model):
    number_identifier = models.IntegerField(default = 0)
    transaction_item = models.ForeignKey(CartItem, related_name = "transaction_item", on_delete = models.CASCADE, blank=True, null=True)
    transaction_buyer = models.ForeignKey(CustomUser, on_delete = models.CASCADE, blank=True, null=True)
    transaction_quantity = models.IntegerField(default=0)
    subtotal = models.DecimalField(max_digits=8, decimal_places=2, validators=[MinValueValidator(1)], null = True, default=0.00)
    checkout_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['checkout_date']



# Create your models here.
