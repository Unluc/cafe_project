from rest_framework import serializers
from gallery.models import Gallery, Image

# class GalleryDetailSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Gallery
#         fields = "__all__"

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["id", "image", "alt"]

class GallerySerializer(serializers.ModelSerializer):
    image_set = ImageSerializer(many=True)

    # def to_representation(self, obj):
    #     representation = super().to_representation(obj)
    #     point_representation = representation.pop('image_set')
    #     print(point_representation[0])
    #     print(representation)
    #     for key in point_representation[0]:
    #         representation[key] = point_representation[key]
    #     return representation
    
    class Meta:
        model = Gallery
        fields = ["id", "title", "slug", "preview", "image_set"]