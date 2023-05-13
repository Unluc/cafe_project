from django.urls import path

from api.gallery.views import GalleryListView, GalleryDetailView

urlpatterns = [
    path('all_gallery/', GalleryListView.as_view(), name='all_gallery'),
    path('<slug:slug>/', GalleryDetailView.as_view(), name='detail'),
    # path('<int:pk>/', GalleryDetailView.as_view(), name='detail'),
]