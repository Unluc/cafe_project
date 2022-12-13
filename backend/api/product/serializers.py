from django.core.validators import EmailValidator
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator

from product.models import Product


class RelatedProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = ("preview", "img_alt", "name", "price" )

class ProductSerializer(serializers.ModelSerializer):
    related_products = serializers.StringRelatedField(many=True, read_only=True)

    # def to_representation(self, obj):
    #     representation = super().to_representation(obj)
    #     point_representation_related_products = representation.pop('related_products')

    #     for key in point_representation_related_products:
    #         representation[key] = point_representation_related_products[key]
    #     return representation

    class Meta:
        model = Product
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }
        fields = ("id", "preview", "img_alt", "name", "slug", "price", "old_price", "overview", "related_products", "new_product", "created_at", "updated_at")

