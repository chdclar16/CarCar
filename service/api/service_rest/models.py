from django.db import models


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
    date_time = models.DateTimeField(auto_now_add=True)
    service_reason = models.TextField()
    status = models.CharField(max_length=200)
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=150)
    technician = models.ForeignKey(
        Technician,
        related_name="technicians",
        on_delete=models.CASCADE,
    )
    def __str__(self):
        return self.customer #or self.vin?
