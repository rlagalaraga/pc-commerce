from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from . import models

class UserAdmin(admin.ModelAdmin):
    list_display = (
                    'id',
                    'first_name',
                    'last_name',
                    'email',
                    'avatar')

admin.site.register(models.CustomUser, UserAdmin)

# Register your models here.