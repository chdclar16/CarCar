from django.db import models

class Salesperson(models.Model):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    employee_id = models.CharField(max_length=40, unique=True)

    def __str__(self):
        return f'{self.employee_id}'


class Customer(models.Model):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    address = models.CharField(max_length=40)
    phone_number = models.CharField(max_length=40)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=40)
    import_href= models.CharField(max_length=200, unique=True, null=True)
    sold = models.BooleanField(null=True)

    def __str__(self):
        return f'{self.vin}'


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="autosales",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salesperson",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.CASCADE,
    )
    price = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.automobile}'
