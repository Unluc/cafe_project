from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView, ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from api.organization.serializers import CommonInfoSerializer

from organization.models import CommonInfo


class CommonInfoDetailView(RetrieveAPIView):
    queryset = CommonInfo.objects.all()
    lookup_field = 'pk'
    serializer_class = CommonInfoSerializer
    permission_classes = [AllowAny]

