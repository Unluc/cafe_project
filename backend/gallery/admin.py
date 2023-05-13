from django.contrib import admin

from gallery.models import Image, Gallery


class ImageModelAdmin(admin.StackedInline):
    model = Image
    fields = ["image", "alt"]


@admin.register(Image)
class MyImageModelAdmin(admin.ModelAdmin):
    pass

@admin.register(Gallery)
class ProductModelAdmin(admin.ModelAdmin):
    model = Gallery
    inlines = [ImageModelAdmin]