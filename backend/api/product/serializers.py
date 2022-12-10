from django.core.validators import EmailValidator
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator

from product.models import Product


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ("id", "preview", "img_alt", "name", "slug", "price", "old_price", "overview", "related_products", "new_product", "created_at", "updated_at")

