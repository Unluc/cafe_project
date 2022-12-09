from django.urls import path

from api.accounts.views import RegisterView, LoginView, LogoutView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    # path('reset_password/', ResetPasswordView.as_view(), name='reset_password'),
    # path('set_password/<int:pk>/', SetPasswordView.as_view(), name='set_password'),
    # path('confirm/', EmailOrPhoneConfirmView.as_view(), name='confirm'),
    # path('profile_data/', ProfileDataView.as_view(), name='profile_data'),
    # path('data_social/', ProfileDataView.as_view(), name='data_social'),
    # path('data_social_create/<int:uid>/', ProfileDataSocialCreateView.as_view(), name='data_social_create'),
    # path('role_picking/', RolePickingView.as_view(), name='role_picking'),
    # path('user_profile/', UserProfileRetrieveView.as_view(), name='user_profile'),
    # path('developer_or_manager/', GetDeveloperOrManagerView.as_view(), name='developer_or_manager'),
]