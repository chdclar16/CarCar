from django.shortcuts import render, get_object_or_404
from .models import Salesperson, Customer, Sale, AutomobileVO
import json
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

class SalespeopleEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "id",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]

class SalesEncoder(ModelEncoder):
    model = Sale
    properties = [
        "customer",
        "automobile",
        "salesperson",
        "price",
        "id",
    ]
    encoders = {
        "salesperson": SalespeopleEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }

@require_http_methods(["GET", "POST"])
def salespeople_list(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salesperson},
            encoder=SalespeopleEncoder,
            safe=False,
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            salespeople = Salesperson.objects.create(**content)
            return JsonResponse(
                {"salespeople": salespeople},
                encoder=SalespeopleEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message":"Invalid Sales Person"},
                status=400,
            )


@require_http_methods(["GET", "POST"])
def customer_list(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"Customer": customer},
            encoder=CustomerEncoder,
            safe=False,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                {"Customer": customer},
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message":"Invalid Customer Info"},
                status=400,
            )


@require_http_methods(["GET", "POST"])
def sales_list(request):
    if request.method == "GET":
        sale_list = Sale.objects.all()
        return JsonResponse(
        {"Sales": sale_list},
        encoder=SalesEncoder,
        safe=False
    )
    else:
        content = json.loads(request.body)
        try:

            auto = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = auto

            salesperson = Salesperson.objects.get(employee_id=content["salesperson"])
            content["salesperson"] = salesperson

            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer

        except AutomobileVO.DoesNotExist or Salesperson.DoesNotExist or Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Information"},
                status=400,
            )

        sold = Sale.objects.create(**content)
        return JsonResponse(
                sold,
                encoder=SalesEncoder,
                safe=False
            )
