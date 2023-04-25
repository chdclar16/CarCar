from django.contrib import admin
from .models import Sale, Customer, Salesperson

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = (
        "automobile",
        "salesperson",
        "customer",
        "price",
    )


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = (
        "first_name",
        "last_name",
        "address",
        "phone_number",
    )


@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
    list_display = (
        "first_name",
        "last_name",
        "employee_id",
    )
