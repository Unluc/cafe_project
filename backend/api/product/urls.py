from django.urls import path

from api.product.views import ProductListView, ProductDetailView

urlpatterns = [
    path('all_products/', ProductListView.as_view(), name='all_products'),
    path('<slug:slug>/', ProductDetailView.as_view(), name='detail'),
]