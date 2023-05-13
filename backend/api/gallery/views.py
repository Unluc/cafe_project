# from django.contrib.auth import login, logout, get_user_model
from django.core.exceptions import ValidationError
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView, ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.reverse import reverse_lazy
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from api.gallery.serializers import GallerySerializer

from gallery.models import Gallery



class GalleryListView(generics.ListAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    permission_classes = [AllowAny]


class GalleryDetailView(generics.RetrieveAPIView):
    queryset = Gallery.objects.all()
    lookup_field = 'slug'
    serializer_class = GallerySerializer
    permission_classes = [AllowAny]
