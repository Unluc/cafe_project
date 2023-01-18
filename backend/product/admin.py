from django.contrib import admin
from product.models import Product

@admin.register(Product)
class ProductModelAdmin(admin.ModelAdmin):
    fields = ['preview', 'img_alt', 'name', 'slug', 'price', 'old_price', "category", 'overview', 'related_products', 'new_product', 'created_at', 'updated_at']
    readonly_fields = ['created_at', 'updated_at']
    list_display = ['name', 'slug', 'price', 'old_price']
    list_display_links = ['name', 'slug']
    # list_filter = ('product_new', 'product_top_sales', 'product_top_goods', 'product_not_active')
    search_fields = ('name', 'new_product')
    # inlines = [ImageModelAdmin]