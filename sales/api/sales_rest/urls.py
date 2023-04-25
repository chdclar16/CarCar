from django.urls import path
from .views import salespeople_list, customer_list, sales_list


urlpatterns = [
    path("salespeople/", salespeople_list, name="salespeople_list"),
    path("customers/", customer_list, name="customer_list"),
    path("sales/", sales_list, name="sales_list")

]
