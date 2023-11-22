from rest_framework import routers
from .views import TodoViewSet, UserViewSet
from django.urls import path

router = routers.DefaultRouter()
router.register(r'todos', TodoViewSet, 'todos')
router.register(r'users', UserViewSet, 'users')
urlpatterns = router.urls