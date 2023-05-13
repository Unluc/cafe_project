from django.core.validators import EmailValidator
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator

from category.models import Category
from api.product.serializers import RelatedProductSerializer


class CategorySerializer(serializers.ModelSerializer):
    product_set = RelatedProductSerializer(many=True)

    class Meta:
        model = Category
        fields = ("id", "preview", "alt", "name", "slug", "short_overview", "visibility", "product_set")


class CategoryParentSerializer(serializers.ModelSerializer):
    product_set = RelatedProductSerializer(many=True)
    sub_categories = serializers.SerializerMethodField(
        read_only=True, method_name="get_child_categories")

    class Meta:
        model = Category
        fields = ("id", "preview", "alt", "name", "slug", "short_overview", "visibility", "product_set", "sub_categories")

    
    def get_child_categories(self, obj):
        """ self referral field """
        serializer = CategorySerializer(
            instance=obj.get_children().exclude(product_set__isnull=True),
            many=True
        )
        return serializer.data

        # 