from rest_framework import serializers
from lossCommunication.models import Event, Producer

class ProducerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Producer
    fields=('id', 'fullName', 'email', 'cpf', 'type', 'lastCrop', 'event', 'location')

class EventSerializer(serializers.ModelSerializer):
  class Meta:
    model = Event
    fields = ('id', 'name')
