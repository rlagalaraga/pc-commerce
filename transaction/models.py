from django.db import models
from users.models import CustomUser
from market.models import Product
from django.core.validators import MinValueValidator

class Transaction(models.Model):
    product = models.ForeignKey(Product, related_name ="item", on_delete = models.CASCADE, blank=True, null=True)
    buyer = models.ForeignKey(CustomUser, on_delete = models.CASCADE, blank=True, null=True)
    quantity = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=8, decimal_places=2, validators=[MinValueValidator(1)], null = True, default=0.00)
    checkout_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['checkout_date']