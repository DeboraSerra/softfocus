from django.db import models

# Create your models here.
class Event(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=500)

class Producer(models.Model):
  id = models.AutoField(primary_key=True)
  fullName = models.CharField(max_length=500)
  email = models.CharField(max_length=500)
  cpf = models.CharField(max_length=11)
  type = models.CharField(max_length=500)
  lastCrop = models.DateField()
  event = models.ForeignKey(Event, on_delete=models.CASCADE)
  location = models.CharField(max_length=500)
