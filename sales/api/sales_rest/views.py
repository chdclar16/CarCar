from django.shortcuts import render
from .models import Salesperson, Customer, Sale, AutomobileVO
import json
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

class SalespeopleEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "name",
        "employee_number",
        "id",
    ]


@require_http_methods(["GET", "POST"])
def salespeople_list(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salesperson},
            encoder=SalespeopleEncoder,
            safe=False,
        )
    else:
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
