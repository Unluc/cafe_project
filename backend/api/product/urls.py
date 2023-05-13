from django.urls import path

from api.product.views import ProductListView, ProductDetailView, NewProductListView

urlpatterns = [
    path('all_products/', ProductListView.as_view(), name='all_products'),
    path('new_products/', NewProductListView.as_view(), name='new_products'),
    path('<slug:slug>/', ProductDetailView.as_view(), name='detail'),
]