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
        "sold",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id"
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

@require_http_methods(["GET", "DELETE"])
def salespeople_description(request, id):
    try:
        salesperson = Salesperson.objects.get(id=id)
    except Salesperson.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid Sales Person"}
        )

    if request.method == "GET":
        return JsonResponse(
            salesperson,
            encoder=SalespeopleEncoder,
            safe=False
        )
    else:
        count, _= Salesperson.objects.filter(id=id).delete()
        return JsonResponse(
            {"deleted": count > 0}
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

@require_http_methods(["GET", "DELETE"])
def customer_description(request, id):
    try:
        customer = Customer.objects.get(id=id)
    except Customer.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid Customer ID"},
            status=400,
        )

    if request.method == "GET":
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )
    else:
        count, _= Customer.objects.filter(id=id).delete()
        return JsonResponse(
            {"deleted": count > 0}
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
            # content["automobile"]["sold"] = True

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

@require_http_methods(["GET","DELETE"])
def sale_description(request, id):
    try:
        sale = Sale.objects.get(id=id)
    except Sale.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid Sale ID"},
            status=400,
        )

    if request.method == "GET":
        return JsonResponse(
            sale,
            encoder=SalesEncoder,
            safe=False
        )
    else:
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )
