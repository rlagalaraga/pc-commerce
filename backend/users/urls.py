from django.urls import path
from users import views
from users import api
from django.contrib.auth.decorators import login_required

app_name = "users"

urlpatterns = [
    path("api/registerUser/", api.UsersViewSet.as_view({'post':'RegisterUser'})),
    path('api/loginUser/', api.UsersViewSet.as_view({'post':'user_login'})),
    path("api/list_sellers/", api.UsersViewSet.as_view({'get':'get_userList'})),
    path('api/get_userDetails/<int:user_id>/', api.UsersViewSet.as_view({'get':'get_userDetails'})),
    
    path('api/logout/', api.LoggedUserViewSet.as_view({'post':'user_logout'})),
    path('api/change_pass/', api.LoggedUserViewSet.as_view({'post':'change_pass'})),
    path('api/get_UserObject/<int:user_id>/', api.LoggedUserViewSet.as_view({'get':'get_UserObject'})),
    path('api/update_user/<int:user_id>/', api.LoggedUserViewSet.as_view({'post':'update_profile'})),
]