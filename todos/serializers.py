from rest_framework import serializers
from .models import Todo
from django.contrib.auth.models import User
from django.db import models




class TodoSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Todo
        fields = ['id', 'name', 'completed', 'owner', 'date']
        
        
class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    class Meta:
        model = User
        fields = ['id', 'username','password']