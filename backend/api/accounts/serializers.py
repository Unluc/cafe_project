# from string import digits

from django.contrib.auth import authenticate
from django.db.models import Q
from django.utils.crypto import get_random_string
from django.contrib.auth.password_validation import validate_password
from django.core.validators import EmailValidator
from rest_framework import serializers
# from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model

# from postie.shortcuts import send_mail
from phonenumber_field.validators import validate_international_phonenumber

# from app.settings import POSTIE_TEMPLATE_CHOICES
from accounts.models import User
# from shared.models.role_choices import USER_ROLE_CHOICES

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(
        write_only=True,
        max_length=254
    )
    password = serializers.CharField(
        max_length=128,
        style={'input_type': 'password'},
        write_only=True
    )

    def validate(self, attrs):
    #     # if '@' in attrs['username'] and User.objects.filter(email=attrs['username'],
    #     #                                                     email_set__email_is_valid=True).exists():
    #     #     attrs['user'] = authenticate(
    #     #         username=attrs['username'], request=self.context['request'], password=attrs['password']
    #     #     )
    #     # elif '+' in attrs['username'] and Phone.objects.filter(phone_number=attrs['username'],
    #     #                                                        phone_is_valid=True).exists():
    #     #     attrs['user'] = authenticate(
    #     #         username=attrs['username'], request=self.context['request'], password=attrs['password']
    #     #     )
    #     # else:
    #     #     if User.objects.filter(username=attrs['username']).exists():
    #     #         attrs['user'] = authenticate(request=self.context['request'], **attrs)
    #     #     else:
    #     #         raise ValidationError({'username': 'Такого username не существует'})
    #     # if not attrs['user']:
    #     #     raise ValidationError({'password': 'Неверный пароль'})
    #     if User.objects.filter(Q(email=attrs['username'], email_set__email_is_valid=True) |
    #                            Q(phone_set__phone_number=attrs['username'], phone_set__phone_is_valid=True) |
    #                            Q(username=attrs['username'])):
        attrs['user'] = authenticate(
            email=attrs['email'], request=self.context['request'], password=attrs['password']
        )
    #     else:
    #         raise ValidationError({'username': 'Такого username не существует'})
    #     if not attrs['user']:
    #         if User.objects.filter(username=attrs['username']).first().check_password(attrs['password']):
    #             raise ValidationError({'password': 'Неактивный пользователь'})
    #         raise ValidationError({'password': 'Неверный пароль'})
        return attrs

class RegisterSerializer(serializers.Serializer):
    # def username_validator(value):
    #     email_validator = EmailValidator()
    #     if '@' in value:
    #         email_validator.__call__(value=value)
    #     elif '+' in value:
    #         validate_international_phonenumber(value)
    #     else:
    #         raise ValidationError(_('Username должен быть почтой или номером телефона'))
    #         # raise ValidationError(_('Username must be email or phone number.'))

    email = serializers.CharField(
        write_only=True,
        required=True,
        validators=[
            UniqueValidator(queryset=User.objects.all()),
            # username_validator,
        ]
    )

    password = serializers.CharField(required=True, validators=[validate_password])

    def create(self, validated_data):
    #     # validated_data['code']
    #     code = get_random_string(length=6, allowed_chars=digits)
    #     if '@' in validated_data['username'] and not User.objects.filter(email=validated_data['username']).exists():
    #         instance = User.objects.create_user(**validated_data, role=self.context['request'].session['role'],
    #                                             email=validated_data['username'])
    #         email = Email.objects.create(user=instance, code=code)
    #         self.context['request'].session['verify'] = {'email': email.pk}
    #         # email.code = code
    #         # email.save()
    #         send_mail(event=POSTIE_TEMPLATE_CHOICES.confirm_email, context={'str': '', 'code': code},
    #                   recipients=[instance.email])
    #     elif '+' in validated_data['username'] and not Phone.objects.filter(
    #             phone_number=validated_data['username']).exists():
    #         instance = User.objects.create_user(**validated_data, role=self.context['request'].session['role'])
    #         phone = Phone.objects.create(phone_number=validated_data['username'], user=instance, code=code)
    #         self.context['request'].session['verify'] = {'phone': phone.pk}
    #     else:
    #         raise ValidationError({'username': 'Этот username уже существует'})
    #     print(code)
    #     # print(instance.pk)
    #     # print(instance.role)
        return instance
