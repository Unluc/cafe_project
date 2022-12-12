"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from django.conf import settings
from django.conf.urls import include
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.contrib.staticfiles.urls import static
from django.urls import path, re_path
from rest_framework import permissions
# from drf_yasg.views import get_schema_view
# from drf_yasg import openapi

# from des import urls as des_urls

# from accounts.views import IndexView, AuthView

# schema_view = get_schema_view(
#     openapi.Info(
#         title="API",
#         default_version='v1',
#         description="Test description",
#     ),
#     public=False,
#     permission_classes=(permissions.AllowAny,),
# )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include([
        path('accounts/', include('api.accounts.urls')),
        path("contact_us/", include('api.contact_us.urls')),
        path("product/", include('api.product.urls')),
    ])),
]+ static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
) + static(
    settings.STATIC_URL,
    document_root=settings.STATIC_ROOT
)

# urlpatterns = [
    # url('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # url(r'^admin/', admin.site.urls),
    # url(r'', include('apps.frontend.urls')),
    # url('i18n', include('django.conf.urls.i18n')),
    # url(r'^jet/', include('jet.urls', 'jet')),
    # url(r'^django-des/', include(des_urls)),

# if settings.DEBUG:
#     urlpatterns += [url(r'^', include('markup.urls'))]
#     urlpatterns += (
#             static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) +
#             static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
#     )

#     if 'debug_toolbar' in settings.INSTALLED_APPS:
#         import debug_toolbar

#         urlpatterns += [
#             url(r'^__debug__/', include(debug_toolbar.urls)),
#         ]

# urlpatterns += i18n_patterns(
#     # path('social_auth/', include('social_django.urls', namespace='social')),
#     # path('', IndexView.as_view(), name='index'),
#     # re_path('auth/', AuthView.as_view(), name='auth'),
#     # path('api/', include('rest_framework.urls', namespace='rest_framework')),


# )