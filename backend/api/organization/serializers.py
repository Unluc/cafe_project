from rest_framework import serializers

from organization.models import CommonInfo


# class RelatedProductSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = Product
#         fields = ("preview", "img_alt", "name", "price", "slug")

class CommonInfoSerializer(serializers.ModelSerializer):
    # related_products = RelatedProductSerializer(many=True)

    class Meta:
        model = CommonInfo
        fields = ("id", 'name', 'privacy_notice', 'conditions_of_use', 'country', 'city', 'post_index', 'address', 'google_link')

