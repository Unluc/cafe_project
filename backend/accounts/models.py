import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

# from app.settings import POSTIE_TEMPLATE_CHOICES
# from apps.accounts.managers import CustomUserManager
from accounts.managers import CustomUserManager

from phonenumber_field.modelfields import PhoneNumberField
# from solo.models import SingletonModel

class User(AbstractUser):
    """
        Custom user instead of default user model
    """
    username = None
    email = models.EmailField(_('Email address'), unique=True)
    new_email = models.EmailField(_('Email address'), unique=True, null=True, blank=True)
    phone_number = PhoneNumberField(null=True, blank=True, unique=False, verbose_name=_('Phone number'))
    token = models.CharField(max_length=100, null=True, blank=True)
    code = models.CharField(max_length=100, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = uuid.uuid4()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email
