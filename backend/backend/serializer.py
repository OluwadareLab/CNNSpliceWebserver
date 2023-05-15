from rest_framework import serializers
from .models import Job, JobRequest, JobResponse

BASE_URL = "http://127.0.0.1:8000/jobs/"

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'reference', 'email', 'model_name',
                  'data_dir', 'status', 'created_at', 'modified_at']


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobRequest
        fields = ['email', 'model_name', 'text_data', 'file_data']


class ResponseSerializer(serializers.ModelSerializer):
    link = serializers.SerializerMethodField()

    class Meta:
        model = JobResponse
        fields = ['reference', 'email', 'model_name', 'status', 'link']

    def get_link(self, obj):
        return BASE_URL + obj.data_dir
