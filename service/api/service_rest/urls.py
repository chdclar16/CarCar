from django.urls import path
from .views import (
    finish_appointment,
    canceled_appointment,
    list_technicians,
    technician_detail,
    appointment_list,
    appointment_detail
)

urlpatterns = [
    path("technicians/", list_technicians, name="list_technicians"),
    path("technicians/<int:pk>/", technician_detail, name="technician_detail"),
    path("appointments/", appointment_list, name="appointment_list"),
    path("appointments/<int:pk>/", appointment_detail, name="appointment_detail"),
    path("appointments/<int:pk>/finish", finish_appointment, name="finish_appointment"),
    path("appointments/<int:pk>/cancel", canceled_appointment, name="canceled_appointment")
]
