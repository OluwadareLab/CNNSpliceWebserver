from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, render
from django.contrib import messages
from django.core.mail import send_mail
from django.contrib.auth.models import auth, User
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.conf import settings
from .models import *

# from .forms import formsubmit


# Create your views here.
def home_view(request):
    template = "index.html"
    if request.method == 'POST':
        check = request.POST.get('isValid')  # validation key from frontend
        email = request.POST.get('email')
        model = request.POST.get('model')
        fastapaste = request.POST.get('fastapaste')
        uploaded_fasta = request.FILES.get('fastafile')
        new_job = DonorAcceptor(fasta=fastapaste,
                                email=email,
                                model=model,
                                file=uploaded_fasta)
        new_job.save()
        # form.save()
        data_path = gen_rand()
        message = 'Thank you for your submission, we have received your job, and it has been added to a queue.  You’ll receive a link when it has been processed.'
        send_mail('CNNSplice Job ' + data_path + ' Submitted', message,
                  'cnnsplice@gmail.com', [email])

        return HttpResponseRedirect('/success')
    # else:
    #     form = formsubmit

    # fasta = open(uploaded_fasta, 'r')
    return render(request, template, {})


def contact_view(request):
    return render(request, "contact.html", {})


def about_view(request):
    return render(request, "about.html", {})


def project_view(request):
    return render(request, "success.html", {})


def example_view(request):
    return render(request, "example.html", {})


def thankyou_view(request):
    return render(request, "success.html", {})
