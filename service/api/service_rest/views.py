from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin"
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id"
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "customer",
        "date",
        "time",
        "service_reason",
        "vin",
        "vip",
        "status",
        "technician"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }


@require_http_methods(["GET"])
def Automobile_list(request):
    if request.method == "GET":
        automobile = AutomobileVO.objects.all()
        return JsonResponse(
            {"autos": automobile},
            encoder=AutomobileVO,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians },
            encoder=TechnicianEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            technicians = Technician.objects.create(**content)
            return JsonResponse(
                technicians,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"},
                status=400
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def technician_detail(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician does not exist"},
                status=404
            )
    elif request.method == "DELETE":
        technician = Technician.objects.filter(id=pk)
        if technician.exists():
            technician.delete()
            return JsonResponse(
                {"message": "Technician successfully deleted"}
                )
        else:
            return JsonResponse(
                {"message": "Technician does not exist"},
                status=404
                )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(id=pk)
            technician.update(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician not found"},
                status=404,
            )

@require_http_methods(["GET", "POST"])
def appointment_list(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            id = content["technician"]
            technician = Technician.objects.get(id=id)
            content.update({
                "technician": technician,
                "vip": content["vin"] in AutomobileVO.objects.all().values_list('vin', flat=True)
            })

            return JsonResponse(
                Appointment.objects.create(**content),
                encoder=AppointmentEncoder,
                safe=False,
            )
        except (Appointment.DoesNotExist, Technician.DoesNotExist):
            return JsonResponse(
                {"message": "Service appointment could not be created"},
                status=400
            )


@require_http_methods(["GET","PUT", "DELETE"])
def appointment_detail(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Service appointment does not exist"},
                status=404,
            )
    elif request.method == "DELETE":
        appointments = Appointment.objects.filter(id=pk)
        if appointments.exists():
            appointments.delete()
            return JsonResponse(
                {"message": "Appointment successfully deleted"}
                )
        else:
            return JsonResponse(
                {"message": "Appointment does not exist"},
                status=404
                )
    else:
        content = json.loads(request.body)
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.status = content.get("status", appointment.status)
            appointment.save()
            appointment.update(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
            {"message": "Appointment not found"},
            status=404,
            )


@require_http_methods(["PUT"])
def finish_appointment(request, pk):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.finished()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment not found"},
                status=404
            )

require_http_methods(["PUT"])
def canceled_appointment(request, pk):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.canceled()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment not found"},
                status=404
            )
