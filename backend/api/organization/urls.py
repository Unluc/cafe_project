from django.urls import path

from api.organization.views import CommonInfoDetailView

urlpatterns = [
    path('<int:pk>/', CommonInfoDetailView.as_view(), name='info'),
]