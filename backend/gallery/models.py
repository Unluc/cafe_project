from django.db import models
from django_unique_slugify import unique_slugify

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
    preview = models.ImageField(upload_to="shared/media/", null=True, blank=True, verbose_name='Gallery preview')
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
            unique_slugify(self, value=self.name, slug_field_name='slug')
        else:
            unique_slugify(self, value=self.slug, slug_field_name='slug')
        super().save(*args, **kwargs)

class Image(models.Model):
    image = models.ImageField(upload_to="shared/media/", null=True, blank=True, verbose_name='Gallery picture')
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