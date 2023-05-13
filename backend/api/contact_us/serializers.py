from django.core.validators import EmailValidator
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator

from contact.models import Contact


class ContactSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        max_length=128,
        min_length=5
    )

    name = serializers.CharField(
        max_length=128,
        min_length=2
    )

    message = serializers.CharField(
        max_length=500,
        min_length=3
    )

    class Meta:
        model = Contact
        fields = ("email", "name", "message")

