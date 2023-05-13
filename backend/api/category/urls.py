from django.urls import path

from api.category.views import CategoryListView

urlpatterns = [
    path('all_categories/', CategoryListView.as_view(), name='all_categories'),
]