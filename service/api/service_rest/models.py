from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, null=True, unique=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin


class Status(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name


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
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=150)
    vip = models.BooleanField(default=False)
    status = models.ForeignKey(
        Status,
        related_name="appointments",
        on_delete=models.PROTECT,
        default=None,
    )

    technician = models.ForeignKey(
        Technician,
        related_name="technicians",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.customer

    def save(self, *args, **kwargs):
        if not self.status:
            created_status, _ = Status.objects.get_or_create(name='Created')
            self.status = created_status
        super().save(*args, **kwargs)

    def finished(self):
        status = Status.objects.get(name="FINISHED")
        self.status = status
        self.save()

    def canceled(self):
        status = Status.objects.get(name="CANCELED")
        self.status = status
        self.save()

    def get_api_url(self):
        return reverse("appointment_detail", kwargs={"id": self.id})

    # @classmethod
    # def create(cls, **kwargs):
    #     kwargs["status"] = Status.objects.get(name="CREATED")
    #     appointment = cls(**kwargs)
    #     appointment.save()
    #     return appointment
