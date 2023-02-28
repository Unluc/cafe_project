from django.urls import path

from api.accounts.views import RegisterView, LoginView, LogoutView, ReceiveCodeConfirmEmailView, ProfileRetrieveUpdateView, ChangePasswordView, ResetPasswordView, InputEmailForResetingPasswordView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('reset_password/<int:pk>/<slug:code>', ResetPasswordView.as_view(), name='reset_password'),
    path('request_for_password_reset/', InputEmailForResetingPasswordView.as_view(), name='request_for_password_reset'),
    # path('set_password/<int:pk>/', SetPasswordView.as_view(), name='set_password'),
    path('confirm_email/<int:pk>', ReceiveCodeConfirmEmailView.as_view(), name='confirm_email'),
    # path('profile_data/', ProfileDataView.as_view(), name='profile_data'),
    # path('data_social/', ProfileDataView.as_view(), name='data_social'),
    # path('data_social_create/<int:uid>/', ProfileDataSocialCreateView.as_view(), name='data_social_create'),
    # path('role_picking/', RolePickingView.as_view(), name='role_picking'),
    # path('user_profile/', UserProfileRetrieveView.as_view(), name='user_profile'),
    path('profile/', ProfileRetrieveUpdateView.as_view(), name='profile'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),
]