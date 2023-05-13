from django.contrib import admin

from organization.models import CommonInfo, Phone, SocialMedia, Email

# from adminsortable2.admin import SortableInlineAdminMixin
from solo.admin import SingletonModelAdmin


class PhoneModelAdmin(admin.StackedInline):
    model = Phone
    fields = ['phone_main', 'phone_active', 'phone_number']
    extra = 1

    # def get_form(self, request, obj=None, **kwargs):
    #     form = super(OrganizationPhoneModelAdmin, self).get_form(request, obj, **kwargs)
    #     form.base_fields['common'].initial = OrganizationCommon.objects.first()
    #     form.base_fields['common'].widget = forms.HiddenInput()
    #     return form


class EmailModelAdmin(admin.StackedInline):
    model = Email
    fields = ['email_main', 'email_active', 'email_address']
    extra = 1


class SocialMediaModelAdmin(admin.StackedInline):
    model = SocialMedia
    fields = ['social_media_main', 'social_media_active', 'social_media_title', 'social_media_url',
              'social_media_picture', 'social_media_alt']
    extra = 1


@admin.register(CommonInfo)
class CommonInfoModelAdmin(SingletonModelAdmin):
    list_display = ['name', 'privacy_notice', 'conditions_of_use', 'country', 'city', 'post_index', 'address', 'google_link']  # TabbedDjangoJqueryTranslationAdmin
    inlines = [PhoneModelAdmin, EmailModelAdmin, SocialMediaModelAdmin]