from tastypie.resources import ModelResource
from todo.models import Task
from tastypie.authentication import Authentication
from tastypie.authorization import Authorization

class TaskResource(ModelResource):
    class Meta:
        queryset = Task.objects.all()
        authentication = Authentication()
        authorization = Authorization()
