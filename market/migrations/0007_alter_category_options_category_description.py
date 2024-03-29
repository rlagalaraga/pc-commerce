# Generated by Django 4.2.5 on 2023-11-21 09:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0006_category_alter_product_availability_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name_plural': 'Categories'},
        ),
        migrations.AddField(
            model_name='category',
            name='description',
            field=models.TextField(blank=True, default='No description.', max_length=1000, null=True),
        ),
    ]
