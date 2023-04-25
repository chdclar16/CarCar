from django.urls import path
from .views import salespeople_list


urlpatterns = [
    path("salespeople/", salespeople_list, name="salespeople_list")
]
