# Generated by Django 4.0.3 on 2023-04-28 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0004_automobilevo_sold'),
    ]

    operations = [
        migrations.AlterField(
            model_name='salesperson',
            name='employee_id',
            field=models.CharField(max_length=40, unique=True),
        ),
    ]
