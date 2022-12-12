import math

from django.core.exceptions import ValidationError
from django.db import models
from django.urls import reverse

from django_unique_slugify import unique_slugify
# from seo.mixins.models import SeoTagsMixin


class Product(models.Model):
    preview = models.ImageField(upload_to="shared/media/", null=True, blank=True, verbose_name='Product preview')
    img_alt = models.CharField(
        max_length=25, 
        null=True, 
        blank=True,
        verbose_name='Alternative product preview name'
    )
    name = models.CharField(max_length=100, verbose_name='Product name')
    slug = models.SlugField(
        max_length=100, 
        null=True, blank=True, 
        verbose_name='Slug product', 
        unique=True
    )
    # product_vendor_code = models.CharField(max_length=100, verbose_name=_('Product vendor code'))
    price = models.PositiveIntegerField(verbose_name='Product price ')
    old_price= models.PositiveIntegerField(
        null=True,
        blank=True,
        verbose_name='Old price '
    )
    overview = models.TextField(
        max_length=1000,
        blank=True,
        null=True,
        verbose_name='Product overview'
    )
    related_products = models.ManyToManyField(
        'self',
        blank=True,
        verbose_name='related products',
        related_name='related_products'
    )
    # product_average_rating = models.FloatField(
    #     blank=True,
    #     null=True,
    #     default=0,
    #     verbose_name='Product average rating'
    # )
    # product_review_count = models.PositiveIntegerField(null=True, blank=True, verbose_name=_('Product review count'))
    new_product = models.BooleanField(null=True, blank=True, default=True, verbose_name='New product')
    # product_top_sales = models.BooleanField(null=True, blank=True, default=False, verbose_name=_('Top sales'))
    # product_top_goods = models.BooleanField(null=True, blank=True, verbose_name=_('Top product'))
    # product_not_active = models.BooleanField(null=True, blank=True, default=False, verbose_name=_('Not active'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Product creation date')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Product update date')
    # product_sale_picture = OptimizedImageField(verbose_name=_('Picture of the sale product'), null=True, blank=True)
    # product_sale_alt = models.CharField(
    #     max_length=50,
    #     null=True,
    #     blank=True,
    #     verbose_name=_('Product of the sale picture alternative name')
    # )

    # category = models.ForeignKey(
    #     Category,
    #     null=True,
    #     blank=True,
    #     on_delete=models.CASCADE,
    #     verbose_name=_('Product category')
    # )
    my_order = models.PositiveIntegerField(default=0, blank=False, null=False)

    class Meta:
        ordering = ['my_order']

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('product', kwargs={'slug': self.slug})

    # def get_product_main(self, parent):
    #     if self.color == parent.color and self.size == parent.size:
    #         raise ValidationError(
    #             {'product_main': 'You cannot add main product if hi has value with the same size and color'})
    #     if parent.product_main:
    #         return self.get_product_main(parent.product_main)
    #     for child in Product.objects.filter(product_main=parent):
    #         if self.color == child.color and self.size == child.size and self.pk != child.pk:
    #             raise ValidationError(
    #                 {'product_main': 'You cannot add main product if hi has value with the same size and color'})
    #     return setattr(self, 'product_main', parent)

    # def clean(self):
    #     if Product.objects.filter(product_slug=self.product_slug, product_main=self):
    #         raise ValidationError({'product_main': 'You cannot add main product if you already a main product'})

    #     if self.product_main:
    #         if self.product_main == self:
    #             raise ValidationError({'product_main': 'You cannot be the main product of yourself'})
    #         if self.color == self.product_main.color and self.size == self.product_main.size:
    #             raise ValidationError(
    #                 {'product_main': 'You cannot add main product if hi has value with the same size and color'})
    #         parent = self.product_main
    #         self.get_product_main(parent)

    def save(self, *args, **kwargs) -> None:
        if self.slug == None:
            unique_slugify(self, value=self.name, slug_field_name='slug')
        else:
            unique_slugify(self, value=self.slug, slug_field_name='slug')
        # if self.product_old_price_main:
        #     # self.product_old_price_main = 0
        #     self.product_old_price_secondary = math.ceil(self.product_old_price_main * parse_value_of_uah())
        # self.product_review_count = self.review_set.filter(review_status='Published').count()
        super().save(*args, **kwargs)


# class Image(models.Model):
#     image = OptimizedImageField(null=True, blank=True, verbose_name=_('Image for product'))
#     product = models.ForeignKey(Product, null=True, blank=True, on_delete=models.CASCADE, related_name='image_set',
#                                 verbose_name=_('Product foreignkey'))
#     image_alt = models.CharField(
#         max_length=50,
#         null=True,
#         blank=True,
#         verbose_name=_('Product of the picture alternative name')
#     )
#     my_order = models.PositiveIntegerField(default=0, blank=False, null=False)

#     class Meta:
#         ordering = ['my_order']

#     def __str__(self) -> str:
#         return f'{self.image}'


