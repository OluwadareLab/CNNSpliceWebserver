FROM ubuntu:20.04
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install -y software-properties-common gcc
RUN add-apt-repository -y ppa:deadsnakes/ppa
RUN apt-get update && apt-get install -y python3.8 python3-distutils python3-pip python3-apt
RUN apt-get install git -y

RUN pip install django
RUN pip install djangorestframework
RUN pip install django-cors-headers
RUN pip install tensorflow
RUN pip install scikit-learn
RUN pip install fasta-one-hot-encoder

COPY ./backend/migrations/__init__.py ./backend/backend/migrations/
COPY ./backend/models/* ./backend/backend/models/
COPY ./backend/*.py ./backend/backend/
COPY ./*.py ./backend/
COPY ./runserver.sh ./backend/

RUN cd backend
RUN chmod +x manage.py
RUN python3 manage.py makemigrations
RUN python3 manage.py migrate

EXPOSE 8080
STOPSIGNAL SIGTERM

CMD ["cd backend", "python3 manage.py makemigrations", "python3 manage.py migrate", "chmod +x ./backend/runserver.sh", "./backend/runserver.sh"]
