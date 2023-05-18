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

COPY ./backend/* ./backend/backend/
COPY ./*.sqlite3 ./backend/
COPY ./*.py ./backend/
COPY ./runserver.sh ./backend/

EXPOSE 8080
STOPSIGNAL SIGTERM
RUN chmod +x ./backend/runserver.sh

CMD ["./backend/runserver.sh"]
