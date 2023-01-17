from django.core.exceptions import ValidationError
from django.db import models, IntegrityError
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _
from django_unique_slugify import unique_slugify
from treebeard.mp_tree import MP_Node, MP_MoveHandler
from django.db import transaction


class Category(MP_Node):
    preview = models.ImageField(null=True, blank=True)
    alt = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        verbose_name='Alternative preview name'
    )
    # preview_for_sliders = models.ImageField(null=True, blank=True)
    # category_alt_for_sliders = models.CharField(
    #     max_length=50,
    #     null=True,
    #     blank=True,
    #     verbose_name=_('Alternative preview name for sliders')
    # )
    name = models.CharField(max_length=50, verbose_name='Category name')
    slug = models.SlugField(max_length=50, verbose_name='Slug for category')
    short_overview = models.TextField(
        max_length=250,
        null=True,
        blank=True,
        verbose_name='Category short overview'
    )
    visibility = models.BooleanField(
        null=True,
        blank=True,
        default=True,
        verbose_name='Category visibility on main page'
    )

    node_order_by = ['category_name']

    def move(self, target, pos=None):
        # if target.depth > 1:
        #     raise PathOverflow(_("Category can only be nested 1 levels deep target"))
        # if self.get_descendants() and (pos == 'sorted-child'):
        #     print(pos)
        #     raise PathOverflow(_("Category can only be nested 1 levels deep target"))
        # return MP_MoveHandler(self, target, pos).process()
        if target.depth > 2:
            target = target.get_ancestors().first()
            if self.get_descendants():
                raise ValidationError('Category can only be nested 1 levels deep target')
        return MP_MoveHandler(self, target, pos).process()

    def __str__(self) -> str:
        return f'{self.name}'

    def get_absolute_url(self):
        if self.is_root():
            url = reverse_lazy('main_category', kwargs={'category': self.slug})
        else:
            parent = self.get_parent()
            url = reverse_lazy('sub_category', kwargs={'category': parent.slug,
                                                       'sub_category': self.slug})
        return url

    def get_filter_url(self):
        if self.is_root():
            url = reverse_lazy('main_catalog_filter', kwargs={'category': self.slug})
        else:
            parent = self.get_parent()
            url = reverse_lazy('sub_catalog_filter', kwargs={'category': parent.slug,
                                                             'sub_category': self.slug})
        return url

    def save(self, *args, **kwargs):
        with transaction.atomic():
            # self.category_slug = unique_slugify(self, value=self.category_slug, slug_field_name='category_slug')
            unique_slugify(self, value=self.slug, slug_field_name='slug')
            super().save(*args, **kwargs)

        # try:
        #     with transaction.atomic():
        #         if Category.objects.filter(category_slug=self.category_slug):
        #             print('im in if')
        #             setattr(self, self.category_slug, self.category_name)
        #             super().save(*args, **kwargs)
        #             print('After save')
        # except:
        #
        # self.category_slug = unique_slugify(self, value=self.category_slug, slug_field_name='category_slug')
        # super().save(*args, **kwargs)

        #                                                       'sub_category': view.kwargs['sub_category']})
        # try:
        #     return reverse_lazy('sub_catalog_filter', kwargs={'category': view.kwargs['category'],
        #                                                       'sub_category': view.kwargs['sub_category']})
        # except KeyError:
        #     return reverse_lazy('main_catalog_filter', kwargs={'category': view.kwargs['category']})