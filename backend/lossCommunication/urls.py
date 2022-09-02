from django.urls import path
from lossCommunication import views

urlpatterns = [
  path('producer/delete/<int:id>', views.producerRoute),
  path('producer/get/<int:id>', views.producerRoute),
  path('producer/<str:cpf>', views.producerRoute),
  path('producer', views.producerRoute),
  path('events', views.eventRoute)
]
