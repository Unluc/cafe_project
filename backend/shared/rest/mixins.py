from app import settings
from django.utils.translation import activate
from typing import Dict, List


class AcceptLanguageMixin:
    """
    Activate language, which was passed through 'Accept-Language' header
    """

    def dispatch(self, request, *args, **kwargs):
        language = request.GET.get('language')

        if not language:
            language = request.META.get('HTTP_ACCEPT_LANGUAGE')

        language_codes = [lang[0] for lang in settings.LANGUAGES]

        if language in language_codes:
            activate(language)

        return super().dispatch(request, *args, **kwargs)


class BaseAPIViewMixin(AcceptLanguageMixin):
    single_message = False
    messages = None
    redirect_url = ''
    additional_response = {}
    _finalize_response = True

    def get_messages(self, serializer=None):
        messages: List[Dict] = self.messages

        if messages:
            for message in messages:
                message.setdefault('type', 'success')

        return messages

    def set_messages(self, data: Dict, serializer=None):
        messages = self.get_messages(serializer)

        if messages:
            if self.single_message:
                data['message'] = messages[0]
            else:
                data['messages'] = messages

    def get_redirect_url(self, serializer=None):
        return self.redirect_url

    def set_redirect_url(self, data: Dict, serializer=None):
        redirect_url = self.get_redirect_url(serializer)

        if redirect_url:
            data['redirect'] = {
                'location': redirect_url
            }

    def _get_response_data(self, response: 'Response'):
        data = response.data

        if data is None:
            data = {}

        return data

    def get_response_data(self, response: 'Response', serializer=None):
        data = self._get_response_data(response)

        if data is not None:
            self.set_redirect_url(data, serializer)
            self.set_messages(data, serializer)

        return {
            'code': response.status_code,
            'data': data,
        }

    def finalize_response(self, request, response: 'Response', *args, **kwargs):
        if response.status_code < 400:
            if self._finalize_response:
                response.data = self.get_response_data(response)

        return super().finalize_response(request, response, *args, **kwargs)