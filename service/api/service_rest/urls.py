from django.urls import path
from .views import (
    Automobile_list,    #might not need, remove if unneeded
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
]
