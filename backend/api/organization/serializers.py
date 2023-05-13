from rest_framework import serializers

from organization.models import CommonInfo, Email, Phone, SocialMedia


class EmailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Email
        fields = ("id", "email_main", "email_active", "email_address")

class PhoneSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Phone
        fields = ("id", "phone_main", "phone_active", "phone_number")

class SocialMediaSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SocialMedia
        fields = ("id", "social_media_main", "social_media_active", "social_media_title", "social_media_url", "social_media_picture", "social_media_alt")

class CommonInfoSerializer(serializers.ModelSerializer):
    phone_set = PhoneSerializer(many=True)
    email_set = EmailSerializer(many=True)
    socialmedia_set = SocialMediaSerializer(many=True)

    class Meta:
        model = CommonInfo
        fields = ("id", 'name', 'privacy_notice', 'conditions_of_use', 'country', 'city', 'post_index', 'address', 'google_link', "phone_set", "email_set", "socialmedia_set")