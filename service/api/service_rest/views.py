from django.shortcuts import render
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
        "first_name",
        "last_name",
        "employee_id"
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "customer",
        "date_time",
        "service_reason",
        "vin",
        "technician",
        "status"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
        #check back later, is an encoder needed for vin
    }
