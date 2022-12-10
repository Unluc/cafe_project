from django.urls import path

from api.product.views import ProductListView

urlpatterns = [
    path('all_products/', ProductListView.as_view(), name='all_products'),
]