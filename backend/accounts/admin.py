from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
# from .models import User, MailRecipient
from .models import User


class CustomUserAdmin(UserAdmin):
    """
        Admin panel for custom user
    """
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ('email', 'is_staff', 'is_active', 'first_name', 'last_name', 'phone_number', "code")
    list_filter = ('email', 'is_staff', 'is_active', 'first_name', 'last_name', 'phone_number', "code")
    fieldsets = (
        (None, {'fields': ('email', 'password', 'first_name', 'last_name', 'phone_number', "code")}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active', 'first_name', 'last_name',
                       'phone_number', "code")}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(User, CustomUserAdmin)
# admin.site.register(MailRecipient)