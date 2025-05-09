from django.urls import path
from .views import register_user, login_user, get_current_user, update_profile

urlpatterns = [
    path('register/', register_user, name='register_user'),
    path('login/', login_user, name='login_user'),
    path('me/', get_current_user, name='get_current_user'),
    path('update_profile/', update_profile, name='update_profile'),
]