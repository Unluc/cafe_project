# Generated by Django 4.1.4 on 2022-12-12 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_alter_product_preview'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='related_products',
            field=models.ManyToManyField(blank=True, related_name='related_products', to='product.product', verbose_name='related products'),
        ),
    ]
