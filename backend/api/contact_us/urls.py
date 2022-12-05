from django.urls import path

from api.contact_us.views import ContactView

urlpatterns = [
    path('contact/', ContactView.as_view(), name='contact_us'),
]