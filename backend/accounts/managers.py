import uuid

from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _
# from postie.shortcuts import send_mail

# import apps.accounts.models
import accounts.models
# from app.settings import POSTIE_TEMPLATE_CHOICES
# from shared.passwords.social_account_password import user_password_from_socials


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password=None, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        extra_fields.setdefault('is_active', False)
        user = self.model(email=email, **extra_fields)
        token = uuid.uuid4()
        user.token = token
        if password:
            user.set_password(password)
        # else:
        #     user.set_password(user_password_from_socials)
            #That was in shopshop
            # email_body = _(
            #     'Hello, \n This is your credentials \n' +
            #     f'User name: {user.email} \n Password: {user_password_from_socials}'
            # )
            # recipient_obj = apps.accounts.models.MailRecipient.objects.filter(mail_template='Social registration').first()
            # send_mail_task.delay(recipient_obj.mail_template, email_body, [user.email])


            #That will be in the future maybe
            # send_mail(event=POSTIE_TEMPLATE_CHOICES.social_registration,
            #           context={'username': user.email, 'password': user_password_from_socials},
            #           recipients=[user.email])
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)