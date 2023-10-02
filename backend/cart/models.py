from django.db import models
from users.models import CustomUser
from market.models import Product, ProductImages

class Cart(models.Model):
    product = models.ForeignKey(Product, related_name ="product", on_delete = models.CASCADE, blank=True, null=True)
    buyer = models.ForeignKey(CustomUser, related_name="buyer", on_delete = models.CASCADE, blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)
    is_sold = models.BooleanField(default=False)
    cart_quantity = models.IntegerField(default=0)
    
    def __str__(self):
        return str(self.product)

    class Meta:
        ordering = ['date_added']

