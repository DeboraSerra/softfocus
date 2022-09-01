from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
import re

from lossCommunication.serializers import EventSerializer, ProducerSerializer
from lossCommunication.models import Event, Producer

# Create your views here.
@csrf_exempt
def eventRoute(request):
  if request.method == 'GET':
    events = Event.objects.all()
    events_serialize = EventSerializer(events, many = True)
    return JsonResponse(events_serialize.data, safe = False)

def validateEmail(email):
  regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
  if re.fullmatch(regex, email):
    return True
  else:
    return False

def validateCpf(cpf):
  isNumber = cpf.isdigit()
  length = len(cpf)
  if isNumber and length == 11:
    return True
  else:
    return False

@csrf_exempt
def producerRoute(request, cpf = 0, id = 0):
  if request.method == 'GET':
    if cpf:
      producer = Producer.objects.get(cpf = cpf);
      producer_serializer = ProducerSerializer(producer, many = False)
      return JsonResponse(producer_serializer.data, safe= False);
    producers = Producer.objects.all();
    producer_serializer = ProducerSerializer(producers, many = True)
    return JsonResponse(producer_serializer.data, safe = False)
  if request.method == 'POST':
    producer_data = JSONParser().parse(request)
    validEmail = validateEmail(producer_data['email'])
    validCpf = validateCpf(producer_data['cpf'])
    if not validEmail or not validCpf:
      return JsonResponse('Informações de email ou CPF estão incorretas', safe=False)
    producer_serializer = ProducerSerializer(data = producer_data)
    if producer_serializer.is_valid():
      producer_serializer.save()
      return JsonResponse('Comunicação de evento adicionada com sucesso', safe=False)
    return JsonResponse('Não foi possível registrar a comunicação de evento', safe=False)
  if request.method == 'PUT':
    producer_data = JSONParser().parse(request)
    validEmail = validateEmail(producer_data['email'])
    validCpf = validateCpf(producer_data['cpf'])
    if not validEmail or not validCpf:
      return JsonResponse('Informações de email ou CPF estão incorretas', safe=False)
    producer = Producer.objects.get(id = producer_data['id'])
    producer_serializer = ProducerSerializer(producer, data = producer_data)
    if producer_serializer.is_valid():
      producer_serializer.save()
      return JsonResponse('Comunicação atualizada com sucesso', safe = False)
    return JsonResponse('Não foi possível atualizar a comunicação', safe = False)
  if request.method == 'DELETE':
    producer = Producer.objects.get(id = id)
    producer.delete()
    return JsonResponse('Comunicação deletada com sucesso', safe = False)
