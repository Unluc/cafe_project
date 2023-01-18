from django.contrib import admin
from django.core.exceptions import ValidationError
from django.db.models import QuerySet
from treebeard.admin import TreeAdmin
from treebeard.exceptions import PathOverflow
from treebeard.forms import MoveNodeForm, movenodeform_factory
from django import forms

from category.models import Category


class CategoryNodeForm(MoveNodeForm):
    class Meta:
        model = Category
        fields = '__all__'
        search_fields = ('name',)

@admin.register(Category)
class CategoryAdmin(TreeAdmin):
    form = movenodeform_factory(Category, CategoryNodeForm)