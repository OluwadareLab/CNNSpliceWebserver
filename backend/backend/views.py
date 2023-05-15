from django.http import JsonResponse
from .models import Job
from .serializer import ResponseSerializer
from rest_framework.decorators import api_view
from rest_framework import status
import random
import string
from datetime import datetime
import os

N = 16
BASE_URL = "http://127.0.0.1:8000/jobs/"
BASE_DIR = './../jobs/'
REQUEST_PREFIX = 'request_'
RESPONSE_PREFIX = 'response_'
FILE_EXT = '.txt'

@api_view(['GET'])
def get_job_status(request):
    reference = request.query_params.get('ref')
    job = Job.objects.filter(reference=reference)
    response = ResponseSerializer(job, many=True).data[0]

    return JsonResponse(response, status=status.HTTP_200_OK, safe=False)


@api_view(['POST'])
def create_job(request):
    email = request.POST.get('email')
    model_name = request.POST.get('model_name')
    text_data = request.POST.get('text_data')
    if request.FILES.get('file_data', False):
        file_data = request.FILES['file_data']

    random_id = ''
    random_id = random_id.join(random.choices(
        string.ascii_uppercase + string.digits, k=N))
    job_id = email + '_' + random_id

    data_dir = BASE_DIR + job_id+'/'
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)

    if text_data is not None and text_data != "":
        filename = datetime.utcnow().strftime('%Y%m%d%H%M%S%f')
        file_path = os.path.abspath(data_dir+REQUEST_PREFIX+filename+FILE_EXT)
        with open(file_path, 'a+') as file:
            lines = text_data.split("\r")
            for line in lines:
                line = line.rstrip()
                file.write(line)
            file.flush()
            file.close()
    elif file_data is not None:
        with open(data_dir+REQUEST_PREFIX+file_data.name, 'wb+') as file:
            for chunk in file_data.chunks():
                file.write(chunk)
            file.flush()
            file.close()

    job = Job()
    job.reference = job_id
    job.email = email
    job.model_name = model_name
    job.data_dir = job_id+'/'
    job.status = 'created'
    job.save()

    serialized_job = ResponseSerializer(job).data

    return JsonResponse(serialized_job, status=status.HTTP_201_CREATED, safe=False)