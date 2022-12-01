from django.contrib.auth import login, logout, get_user_model
from django.core.exceptions import ValidationError
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView, ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.reverse import reverse_lazy
from rest_framework.views import APIView

from api.accounts.serializers import RegisterSerializer, LoginSerializer

from accounts.models import User
# from shared.permissions.rest_view_permission import IsAnonymous, IsManager, IsDeactivated
# from shared.rest.mixins import BaseAPIViewMixin

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    # permission_classes = (IsAnonymous,)
    # permission_classes = (IsManager, IsDeactivated)
    serializer_class = RegisterSerializer

    # redirect_url = reverse_lazy('confirm')

    def perform_create(self, serializer):
        instance = serializer.save()
        self.request.session['user_pk'] = instance.pk

    def post(self, request, *args, **kwargs):
        self.serializer = self.get_serializer(data=self.request.data)
        self.serializer.is_valid(raise_exception=True)
        self.create(request, *args, **kwargs)
        # self.serializer.create(request, *args, **kwargs)
        print(self.request.session['verify'])
        return Response(status=status.HTTP_201_CREATED, data=self.request.data)


class LoginView(GenericAPIView):
    serializer_class = LoginSerializer
    # permission_classes = (IsAnonymous,)

    # redirect_url = reverse_lazy('index')

    def process_login(self):
        login(self.request, self.user)

    def login(self):
        self.user = self.serializer.validated_data['user']
        self.process_login()

    def post(self, request, *args, **kwargs):
        self.request = request
        self.serializer = self.get_serializer(data=self.request.data, context={'request': request})
        self.serializer.is_valid(raise_exception=True)
        self.login()
        return Response(status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    redirect_url = reverse_lazy('index')

    def post(self, *args, **kwargs):
        logout(self.request)
        return Response(status=status.HTTP_200_OK)


