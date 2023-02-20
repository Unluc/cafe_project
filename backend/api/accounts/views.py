from django.contrib.auth import login, logout, get_user_model
from django.core.exceptions import ValidationError
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView, ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.reverse import reverse_lazy
from rest_framework.views import APIView

from api.accounts.serializers import RegisterSerializer, LoginSerializer, CodeCheckSerializer

from accounts.models import User
import json
# from shared.permissions.rest_view_permission import IsAnonymous, IsManager, IsDeactivated
# from shared.rest.mixins import BaseAPIViewMixin

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    # permission_classes = (IsAnonymous,)
    # permission_classes = (IsManager, IsDeactivated)
    serializer_class = RegisterSerializer

    # redirect_url = reverse_lazy('confirm')

    # def perform_create(self, serializer):
    #     instance = serializer.save()
    #     self.request.session['user_pk'] = instance.pk

    def post(self, request, *args, **kwargs):
        self.serializer = self.get_serializer(data=self.request.data)
        self.serializer.is_valid(raise_exception=True)
        self.create(request, *args, **kwargs)
        user = User.objects.filter(email=self.request.data["email"]).first()
        # self.request.data._mutable = True        
        self.request.data["id"] = user.id
        self.request.data["is_active"] = user.is_active
        # self.request.data._mutable = False
        # self.serializer.create(request, *args, **kwargs)
        # print(self.request.session['verify'])
        return Response(status=status.HTTP_201_CREATED, data=self.request.data)


class LoginView(GenericAPIView):
    serializer_class = LoginSerializer
    # permission_classes = (IsAnonymous,)

    # redirect_url = reverse_lazy('index')

    # def process_login(self):
    #     login(self.request, self.user)

    # def login(self):
    #     self.user = self.serializer.validated_data['user']
    #     self.process_login()

    def post(self, request, *args, **kwargs):
        self.request = request
        self.serializer = self.get_serializer(data=self.request.data, context={'request': request})
        self.serializer.is_valid(raise_exception=True)
        # self.login()
        # User.objects.filter(email=self.request.data["email"]).first()
        user = self.serializer.validated_data['user']
        login(request=self.request, user=user)
        # print(self.request.data)
        # self.request.data._mutable = True        
        self.request.data["id"] = user.id
        self.request.data["is_active"] = user.is_active
        # self.request.data._mutable = False
        # print(self.request.data)
        return Response(data=self.request.data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    redirect_url = reverse_lazy('index')

    def post(self, *args, **kwargs):
        logout(self.request)
        return Response(status=status.HTTP_200_OK)


class ReceiveCodeView(generics.GenericAPIView):
    serializer_class = CodeCheckSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        if not User.objects.filter(id=kwargs["pk"]):
            raise ValidationError({'code': 'Wrong link'})
        if User.objects.filter(id=kwargs["pk"]).first().code == self.request.data["code"]:
            user = User.objects.filter(id=kwargs["pk"]).first()
            user.is_active = True
            user.code = ""
            user.save()
            return Response(data=self.request.data, status=status.HTTP_200_OK)

        raise ValidationError({'code': 'Wrong code'})

        # social = SocialFacebookVerification.objects.first()
        # if request.data['code'] == social.code:
        #     social.verified = True
        #     social.save()
        #     return Response(
        #         {
        #             'code': status.HTTP_200_OK,
        #             'data': {
        #                 'redirect': {
        #                     'location': reverse_lazy('social:complete', kwargs={'backend': 'facebook'})
        #                 },
        #             }
        #         }
        #     )
        # else:
        #     return Response(
        #         {
        #             'data': {
        #                 'message': {
        #                     'error': {
        #                         'title': _('Wrong code')
        #                     }},
        #             }
        #         }
        #     )
