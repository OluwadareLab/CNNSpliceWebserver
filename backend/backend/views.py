from django.http import JsonResponse
from .models import Job
from .serializer import ResponseSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.mail import send_mail
import random
import string
from datetime import datetime
import os
from . import cnnsplice as model

N = 16

BASE_URL = "http://biomlearn.uccs.edu:8081/jobs/"
BASE_DIR = '/storage/store/CNNSpliceWebserver/jobs/'
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
    random_id = random_id.join(
        random.choices(string.ascii_uppercase + string.digits, k=N))
    job_id = email + '_' + random_id

    data_dir = "./../"+BASE_DIR + job_id + "/"
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)

    filename = ''
    if text_data is not None and text_data != "":
        filename = REQUEST_PREFIX + datetime.utcnow().strftime(
            '%Y%m%d%H%M%S%f') + FILE_EXT
        file_path = os.path.abspath(data_dir + filename)
        with open(file_path, 'a+') as file:
            lines = text_data.split("\r")
            for line in lines:
                line = line.rstrip()
                file.write(line)
            file.flush()
            file.close()
    elif file_data is not None:
        filename = file_data.name
        with open(data_dir + filename, 'wb+') as file:
            for chunk in file_data.chunks():
                file.write(chunk)
            file.flush()
            file.close()

    job = Job()
    job.reference = job_id
    job.email = email
    job.model_name = model_name
    job.data_dir = BASE_DIR + job_id +"/"
    job.save()

    result_path = BASE_URL + BASE_DIR + job_id + "/result.txt"
    message = 'Thank you for your submission, we have received your job, and it has been added to a queue.  Visit ' + \
        result_path + ' to view job result in one hour.'
    message2 = 'Job result now available via the link ' + result_path

    send_mail('CNNSplice Job ' + data_dir + ' Submitted', message,
              'cnnsplice@gmail.com', [email])

    serialized_job = ResponseSerializer(job).data

    model.main(modeltype=model_name, filename=filename, location=data_dir)

    send_mail('CNNSplice Job ' + data_dir + ' Completed', message2,
              'cnnsplice@gmail.com', [email])

    return JsonResponse(serialized_job,
                        status=status.HTTP_201_CREATED,
                        safe=False)