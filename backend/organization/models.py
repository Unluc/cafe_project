from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from shared.rest.file_cleanup import post_save_image, pre_save_image

class Singleton(models.Model):
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super(Singleton, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj


class CommonInfo(Singleton):
    name = models.CharField(max_length=200, verbose_name='Company name')
    privacy_notice = models.CharField(max_length=1000, verbose_name='Privacy notice')
    conditions_of_use = models.CharField(max_length=1000, verbose_name='Conditions of use')
    country = models.CharField(max_length=50, verbose_name='Country')
    city = models.CharField(max_length=50, verbose_name='City')
    post_index = models.CharField(max_length=20, verbose_name='Post index')
    address = models.CharField(max_length=100, verbose_name='Address')
    google_link = models.CharField(max_length=300, verbose_name='Embedded link from google maps')

    def __str__(self):
        return self.name


class Phone(models.Model):
    phone_main = models.BooleanField(verbose_name='Main phone', default=False)
    phone_active = models.BooleanField(verbose_name='Active phone', default=False)
    phone_number = PhoneNumberField(unique=True, verbose_name='Phone number')

    common = models.ForeignKey(CommonInfo, on_delete=models.CASCADE, related_name='phone_set')

    my_order = models.PositiveIntegerField(default=0, blank=False, null=False)

    class Meta:
        ordering = ['my_order']

    def __str__(self):
        return str(self.phone_number)


class Email(models.Model):
    email_main = models.BooleanField(verbose_name='Main email', default=False)
    email_active = models.BooleanField(verbose_name='Active mail', default=False)
    email_address = models.EmailField(unique=True, verbose_name='Mail address')

    common = models.ForeignKey(CommonInfo, on_delete=models.CASCADE, related_name='email_set')

    my_order = models.PositiveIntegerField(default=0, blank=False, null=False)

    class Meta:
        ordering = ['my_order']

    def __str__(self):
        return self.email_address


class SocialMedia(models.Model):
    social_media_main = models.BooleanField(verbose_name='Main social media', default=False)
    social_media_active = models.BooleanField(verbose_name='Active social media', default=False)
    social_media_title = models.CharField(max_length=200, verbose_name='Social media title')
    social_media_url = models.CharField(max_length=100, verbose_name='Social media URL')
    social_media_picture = models.FileField(verbose_name='Social media picture')
    social_media_alt = models.CharField(max_length=50, verbose_name='Alternative name for social media picture')

    common = models.ForeignKey(CommonInfo, on_delete=models.CASCADE, related_name='socialmedia_set')

    my_order = models.PositiveIntegerField(default=0, blank=False, null=False)

    class Meta:
        ordering = ['my_order']

    def __str__(self):
        return self.social_media_title


@receiver(post_delete, sender=SocialMedia)
def post_save_image(sender, instance, *args, **kwargs):
    """ Clean Old Image file """
    try:
        instance.social_media_picture.delete(save=False)
    except:
        pass


@receiver(pre_save, sender=SocialMedia)
def pre_save_image(sender, instance, *args, **kwargs):
    """ instance old image file will delete from os """
    try:
        old_img = instance.__class__.objects.get(id=instance.id).social_media_picture.path
        try:
            new_img = instance.social_media_picture.path
        except:
            new_img = None
        if new_img != old_img:
            import os
            if os.path.exists(old_img):
                os.remove(old_img)
    except:
        pass