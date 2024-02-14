# Generated by Django 4.2.5 on 2023-11-29 10:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('cart', '0002_cartitem_remove_cart_buyer_remove_cart_product'),
        ('market', '0009_alter_review_rating'),
        ('transaction', '0002_alter_transaction_transaction_item'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Cart',
        ),
        migrations.AddField(
            model_name='cartitem',
            name='buyer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='buyer', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='cartitem',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product', to='market.product'),
        ),
    ]