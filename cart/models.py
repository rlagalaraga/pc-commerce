from django.db import models
from users.models import CustomUser
from market.models import Product, ProductImages
from django.core.validators import MinValueValidator

class CartItem(models.Model):
    product = models.ForeignKey(Product, related_name ="product", on_delete = models.CASCADE, blank=True, null=True)
    buyer = models.ForeignKey(CustomUser, related_name="buyer", on_delete = models.CASCADE, blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)
    quantity = models.IntegerField(default=1, validators=[MinValueValidator(1)])
    
    def __str__(self):
        return str(self.product)

    class Meta:
        ordering = ['date_added']

