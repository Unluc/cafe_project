from django.utils.translation import pgettext_lazy
from rest_framework import status
from rest_framework.views import (
    exception_handler as drf_exception_handler,
)
from rest_framework.exceptions import (
    AuthenticationFailed,
    APIException,
    PermissionDenied,
    NotFound,
    Throttled
)


class ExceptionHandler:
    def get_domain(self):
        """
        Domain examples
        """
        if self.status_code >= 500:
            return 'data_process'

        return 'request'

    def get_full_details(self, detail):
        if isinstance(detail, list):
            return [self.get_full_details(item) for item in detail]

        elif isinstance(detail, dict):
            return {
                'domain': self.get_domain(),
                'state': {
                    key: self.get_full_details(value)
                    for key, value in detail.items()
                }
            }

        return {
            'message': str(detail),
            'reason': detail.code,
            # 'state': {
            #     'non_field_errors': [
            #         {
            #             'message': str(detail),
            #             'reason': detail.code,
            #         }
            #     ]
            # }
        }

    def get_exception_message(self):
        status_code = self.status_code
        exception_string = pgettext_lazy('exception message', 'Bad request')

        if status_code == status.HTTP_500_INTERNAL_SERVER_ERROR:
            exception_string = APIException.default_detail
        elif status_code == status.HTTP_401_UNAUTHORIZED:
            exception_string = AuthenticationFailed.default_detail
        elif status_code == status.HTTP_403_FORBIDDEN:
            exception_string = PermissionDenied.default_detail
        elif status_code == status.HTTP_404_NOT_FOUND:
            exception_string = NotFound.default_detail
        elif status_code == status.HTTP_429_TOO_MANY_REQUESTS:
            exception_string = Throttled.default_detail

        return exception_string

    def __call__(self, exc, context):
        # Call REST framework's default exception handler first,
        # to get the standard error response.
        response = drf_exception_handler(exc, context)

        if response is None:
            return response

        self.status_code = response.status_code

        if response is not None and hasattr(exc, 'detail'):
            response.data = {
                'code': self.status_code,
                'message': self.get_exception_message()
            }

            full_details = self.get_full_details(exc.detail)

            if isinstance(full_details, dict):
                error = {
                    'message': exc.default_detail,
                    'domain': self.get_domain(),
                    'reason': exc.default_code,
                    **full_details
                }
                error.setdefault(
                    'state',
                    {
                        'non_field_errors': [
                            {
                                'message': full_details.get('message', str(exc.default_detail)),
                                'reason': full_details.get('reason', exc.default_code),
                            }
                        ]
                    }
                )
                errors = [error]
            else:
                errors = full_details

            response.data['errors'] = errors

        return response


exception_handler = ExceptionHandler()