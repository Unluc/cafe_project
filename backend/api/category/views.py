from django.contrib.auth import login, logout, get_user_model
from django.core.exceptions import ValidationError
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView, ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.reverse import reverse_lazy
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from api.category.serializers import CategoryParentSerializer

from category.models import Category



class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(depth=1)
    serializer_class = CategoryParentSerializer
    permission_classes = [AllowAny]
