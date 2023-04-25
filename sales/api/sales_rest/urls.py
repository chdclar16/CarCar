from django.urls import path
from .views import salespeople_list, customer_list, sales_list, sale_description, customer_description, salespeople_description


urlpatterns = [
    path("salespeople/", salespeople_list, name="salespeople_list"),
    path("customers/", customer_list, name="customer_list"),
    path("sales/", sales_list, name="sales_list"),
    path("sales/<int:id>/", sale_description, name="sale_description"),
    path("salespeople/<int:id>/", salespeople_description, name="salespeople_description"),
    path("customers/<int:id>/", customer_description, name="customer_description"),

]
