from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import TodoSerializer, UserSerializer
from .models import Todo
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView



class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    def get_queryset(self):
        queryset = Todo.objects.filter(owner=self.request.user)
        return queryset
    
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
