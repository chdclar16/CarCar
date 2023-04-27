from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, null=True, unique=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin


class Technician(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    employee_id = models.CharField(max_length=150)

    def __str__(self):
        return self.first_name + " " + self.last_name


class Appointment(models.Model):
    date = models.CharField(max_length=30, default="")
    time = models.CharField(max_length=30, default="")
    service_reason = models.TextField()
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=150)
    vip = models.BooleanField(default=False)
    status = models.CharField(max_length=50, default="Created")

    technician = models.ForeignKey(
        Technician,
        related_name="technicians",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return self.customer

    def finished(self):
        self.status = "Finished"
        self.save()

    def canceled(self):
        self.status = "Canceled"
        self.save()

    def get_api_url(self):
        return reverse("appointment_detail", kwargs={"id": self.id})
