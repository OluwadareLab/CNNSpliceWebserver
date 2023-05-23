from rest_framework import serializers
from .models import Job, JobResponse

BASE_URL = "http://biomlearn.uccs.edu:8081"

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'reference', 'email', 'model_name',
                  'data_dir', 'created_at', 'modified_at']

class ResponseSerializer(serializers.ModelSerializer):
    link = serializers.SerializerMethodField()

    class Meta:
        model = JobResponse
        fields = ['reference', 'email', 'model_name', 'link']

    def get_link(self, obj):
        return BASE_URL + obj.data_dir + "result.txt"
