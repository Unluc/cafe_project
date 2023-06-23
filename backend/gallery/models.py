from django.db import models
from django_unique_slugify import unique_slugify
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from shared.rest.file_cleanup import post_save_image, pre_save_image

class Gallery(models.Model):
    title = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        verbose_name='Gallery title'
    )
    slug = models.SlugField(
        max_length=100, 
        null=True, blank=True, 
        verbose_name='Slug product', 
        unique=True
    )
    preview = models.ImageField(null=True, blank=True, verbose_name='Gallery preview')
    alt = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        verbose_name='Gallery preview alternative name'
    )
    def __str__(self) -> str:
        if self.alt:
            return f'{self.alt}'
        return f'{self.preview}'

    def save(self, *args, **kwargs) -> None:
        if self.slug == None:
            unique_slugify(self, value=self.title, slug_field_name='slug')
        else:
            unique_slugify(self, value=self.slug, slug_field_name='slug')
        super().save(*args, **kwargs)

class Image(models.Model):
    image = models.ImageField(null=True, blank=True, verbose_name='Gallery picture')
    gallery = models.ForeignKey(Gallery, null=True, blank=True, on_delete=models.CASCADE, related_name='image_set',
                                verbose_name='Gallery foreignkey')
    alt = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        verbose_name='Picture alternative name'
    )
    my_order = models.PositiveIntegerField(default=0, blank=False, null=False)

    class Meta:
        ordering = ['my_order']

    def __str__(self) -> str:
        if self.alt:
            return f'{self.alt}'
        return f'{self.image}'
    

pre_save.connect(pre_save_image, sender=Gallery)
post_delete.connect(post_save_image, sender=Gallery)

@receiver(post_delete, sender=Image)
def post_save_image(sender, instance, *args, **kwargs):
    """ Clean Old Image file """
    try:
        instance.image.delete(save=False)
    except:
        pass

@receiver(pre_save, sender=Image)
def pre_save_image(sender, instance, *args, **kwargs):
    """ instance old image file will delete from os """
    try:
        old_img = instance.__class__.objects.get(id=instance.id).image.path
        try:
            new_img = instance.image.path
        except:
            new_img = None
        if new_img != old_img:
            import os
            if os.path.exists(old_img):
                os.remove(old_img)
    except:
        pass