from django.contrib.auth import login, logout, get_user_model
from django.core.exceptions import ValidationError
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView, ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.reverse import reverse_lazy
from rest_framework.views import APIView

from api.accounts.serializers import RegisterSerializer, LoginSerializer, CodeCheckSerializer, UserProfileSerializer, ChangePasswordSerializer, \
    ResetPasswordSerializer, InputEmailForResetingPasswordSerializer, InputEmailForResetingEmailSerializer, ResetEmailSerializer

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
        data = self.request.data.copy()    
        data["id"] = user.id
        data["is_active"] = user.is_active
        # print(data)
        # print(self.request.user)
        # self.request.data._mutable = False
        # print(self.request.data)
        return Response(data=data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    # redirect_url = reverse_lazy('index')

    def post(self, *args, **kwargs):
        # print("self.request.user")
        # print(self.request.user)
        # print(self.request.user.is_authenticated)
        # print("self.request.user.is_authenticated")
        logout(self.request)
        return Response(status=status.HTTP_200_OK)


class ReceiveCodeConfirmEmailView(generics.GenericAPIView):
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


class ProfileRetrieveUpdateView(RetrieveUpdateAPIView):
    """
    An endpoint for changing personal data.
    """
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def put(self, request, *args, **kwargs):
        self.serializer = self.get_serializer(data=self.request.data)
        self.serializer.is_valid()
        self.update(request, *args, **kwargs)
        return Response(
            {
                'code': status.HTTP_200_OK,
                'data': {
                    'redirect': {
                        'location': '/'
                    },
                }
            }
        )

class ChangePasswordView(GenericAPIView):
    """
    An endpoint for changing personal data.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        self.serializer = self.get_serializer(data=self.request.data)
        self.serializer.is_valid(raise_exception=True)
        self.object.set_password(request.data.get("new_password1"))
        self.object.save()
        login(request, self.object, backend='django.contrib.auth.backends.ModelBackend')
        return Response(
            {
                'code': status.HTTP_200_OK,
                'data': {
                    'redirect': {
                        'location': '/'
                    },
                }
            }
        )
    

class InputEmailForResetingPasswordView(GenericAPIView):
    """
    An endpoint for changing personal data.
    """
    serializer_class = InputEmailForResetingPasswordSerializer
    model = User
    # permission_classes = (IsAuthenticated,)

    # def get_object(self, queryset=None):
    #     obj = self.request.user
    #     return obj

    def post(self, request, *args, **kwargs):
        # self.object = self.get_object()
        if self.request.user.is_authenticated:
            raise ValidationError({'new_password1': 'You cannot access this page while logged in'})
        self.serializer = self.get_serializer(data=self.request.data)
        self.serializer.is_valid(raise_exception=True)
        # self.object.set_password(request.data.get("new_password1"))
        # self.object.save()
        # login(request, self.object, backend='django.contrib.auth.backends.ModelBackend')
        return Response(
            {
                'code': status.HTTP_200_OK,
                'data': {
                    'redirect': {
                        'location': '/'
                    },
                }
            }
        )



class ResetPasswordView(GenericAPIView):
    """
    An endpoint for changing personal data.
    """
    serializer_class = ResetPasswordSerializer
    model = User
    # permission_classes = (IsAuthenticated,)

    # def get_object(self, queryset=None):
    #     obj = self.request.user
    #     return obj

    def post(self, request, *args, **kwargs):
        # self.object = self.get_object()
        self.serializer = self.get_serializer(data=self.request.data)
        self.serializer.is_valid(raise_exception=True)
        if not User.objects.filter(id=kwargs["pk"]) or not User.objects.filter(id=kwargs["pk"]).first().code == self.kwargs["code"]:
            # return Response({
            #         'code': status.HTTP_400_BAD_REQUEST,
            #         'status': status.HTTP_400_BAD_REQUEST,
            #         'data': {
            #             'errors': {
            #                 'email': {
            #                     "state": ('Wrong link')
            #                 }
            #             },
            #         }
            #     })
            raise ValidationError({'new_password1': 'Wrong link'})
        if self.request.user.is_authenticated:
            raise ValidationError({'new_password1': 'You cannot access this page while logged in'})
        # if not User.objects.filter(id=kwargs["pk"]).first().code == self.kwargs["code"]:
        #     raise ValidationError({'new_password1': 'Wrong url'})
        user = User.objects.filter(id=kwargs["pk"]).first()
        # user.set_password(request.data.get("new_password1"))
        if user.check_password(request.data.get("new_password1")):
            raise ValidationError({'new_password1': 'You cannot use old password for new password'})
        user.set_password(request.data.get("new_password1"))
        user.code = ""
        user.save()
        print(f"User password:{user.password}")
        
        # print(f"User password:{request.data.get("new_password1")}")
        # self.object.save()
        # login(request, self.object, backend='django.contrib.auth.backends.ModelBackend')
        return Response(
            {
                'code': status.HTTP_200_OK,
                'data': {
                    'redirect': {
                        'location': '/'
                    },
                }
            }
        )
    

class InputEmailForResetingEmailView(GenericAPIView):
    """
    An endpoint for changing personal data.
    """
    serializer_class = InputEmailForResetingEmailSerializer
    model = User
    # permission_classes = (IsAuthenticated,)

    # def get_object(self, queryset=None):
    #     obj = self.request.user
    #     return obj

    def post(self, request, *args, **kwargs):
        # self.object = self.get_object()
        # if self.request.user.is_authenticated:
        #     raise ValidationError({'new_password1': 'You cannot access this page while logged in'})
        self.serializer = self.get_serializer(data=self.request.data)
        self.serializer.is_valid(raise_exception=True)
        # self.object.set_password(request.data.get("new_password1"))
        # self.object.save()
        # login(request, self.object, backend='django.contrib.auth.backends.ModelBackend')
        return Response(
            {
                'code': status.HTTP_200_OK,
                'data': {
                    'redirect': {
                        'location': '/'
                    },
                }
            }
        )
    
class ResetEmailView(GenericAPIView):
    """
    An endpoint for changing personal data.
    """
    serializer_class = ResetEmailSerializer
    model = User
    # permission_classes = (IsAuthenticated,)

    # def get_object(self, queryset=None):
    #     obj = self.request.user
    #     return obj

    def post(self, request, *args, **kwargs):
        # self.object = self.get_object()
        self.serializer = self.get_serializer(data=self.request.data)
        self.serializer.is_valid(raise_exception=True)
        if not User.objects.filter(id=kwargs["pk"]) or not User.objects.filter(id=kwargs["pk"]).first().code == self.kwargs["code"]:
            # return Response({
            #         'code': status.HTTP_400_BAD_REQUEST,
            #         'status': status.HTTP_400_BAD_REQUEST,
            #         'data': {
            #             'errors': {
            #                 'email': {
            #                     "state": ('Wrong link')
            #                 }
            #             },
            #         }
            #     })
            raise ValidationError({'new_email': 'Wrong link'})
        if not self.request.user.is_authenticated:
            raise ValidationError({'new_email': 'You cannot access this page while logged in'})
        # if not User.objects.filter(id=kwargs["pk"]).first().code == self.kwargs["code"]:
        #     raise ValidationError({'new_password1': 'Wrong url'})
        user = User.objects.filter(id=kwargs["pk"]).first()
        # user.set_password(request.data.get("new_password1"))
        # if user.check_password(request.data.get("new_password1")):
        #     raise ValidationError({'new_password1': 'You cannot use old password for new password'})
        # user.set_password(request.data.get("new_password1"))
        user.email = request.data.get("new_email")
        user.code = ""
        user.save()
        print(f"User new email:{user.email}")
        
        # print(f"User password:{request.data.get("new_password1")}")
        # self.object.save()
        # login(request, self.object, backend='django.contrib.auth.backends.ModelBackend')
        return Response(
            {
                'code': status.HTTP_200_OK,
                'data': {
                    'redirect': {
                        'location': '/'
                    },
                }
            }
        )