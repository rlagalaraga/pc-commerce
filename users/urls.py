from django.urls import path
from users import views
from users import api
from django.contrib.auth.decorators import login_required

app_name = "users"

urlpatterns = [
    path("api/register/user/", api.UsersViewSet.as_view({'post':'register_user'}, name='register-user')),
    path('api/login/user/', api.UsersViewSet.as_view({'post':'user_login'}, name='login-user')),
    path("api/users/", api.UsersViewSet.as_view({'get':'get_all_users'}, name="get-users")),
    path('api/get/user/<int:user_id>/', api.UsersViewSet.as_view({'get':'get_user_by_id'}, name='get-user-detail')),
    path("api/get/user/", api.LoggedUserViewSet.as_view({'get':'get_user'}, name='get-user')),
    path('api/logout/', api.UsersViewSet.as_view({'post':'user_logout'}, name='logout-user')),
    path('api/change/pass/', api.LoggedUserViewSet.as_view({'post':'change_pass'}, name='change-pass')),
    path('api/get_UserObject/<int:user_id>/', api.LoggedUserViewSet.as_view({'get':'get-UserObject'})),
    path('api/update/user/<int:user_id>/', api.LoggedUserViewSet.as_view({'post':'update_profile'}, name='update-user')),
]