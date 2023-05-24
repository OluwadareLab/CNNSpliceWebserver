import queue
from dataclasses import dataclass
from django.http import JsonResponse
from .models import Job
from .serializer import ResponseSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.mail import send_mail, EmailMessage
import random
import string
from datetime import datetime
import os
from . import cnnsplice as model
import magic

N = 16

BASE_URL = "http://biomlearn.uccs.edu:8080"
BASE_DIR = "/home/ubuntu/CNNSplice/jobs/"
REQUEST_PREFIX = 'request_'
RESPONSE_PREFIX = 'response_'
FILE_EXT = '.txt'


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
    job_id = random_id

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
    job.data_dir = BASE_DIR + job_id + "/"
    job.save()

    result_path = BASE_URL + BASE_DIR + job_id + "/result.txt"

    submission_message = 'Dear User,\n\nThank you for your submission. We have received your job, and it has been added to a queue. Your Job Id = ' + \
        job_id+'. You will receive an email once the job is completed.\n\nThank you for using CNNSplice.\nOluwadare Lab'

    submission_mail = EmailMessage(subject='CNNSplice Job Id '+job_id+' Submitted',
                                   body=submission_message, from_email='cnnsplice@gmail.com', to=[email])
    submission_mail.send()


    model.main(modeltype=model_name,
               filename=filename, location=data_dir)

    complition_message = 'The job result for Job Id = '+job_id + \
        ' is attached to this email.\n\nThank you for using CNNSplice.\nOluwadare Lab'

    complition_mail = EmailMessage(subject='CNNSplice Job Id '+job_id+' Completed',
                                   body=complition_message, from_email='cnnsplice@gmail.com', to=[email])
    
    result_filename = "result.txt"
    mime = magic.Magic(mime=True)
    mimetype = mime.from_file(data_dir + result_filename)
    with open(data_dir + result_filename, 'wb+') as r_file:
        complition_mail.attach(r_file.name, r_file.read(), mimetype)
        complition_mail.send()
        r_file.flush()
        r_file.close()

    serialized_job = ResponseSerializer(job).data
    return JsonResponse(serialized_job,
                        status=status.HTTP_201_CREATED,
                        safe=False)
