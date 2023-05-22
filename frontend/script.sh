#!/bin/bash
docker build -t cnn_splice_frontend .
docker run -it -d --name cnn_splice_frontend -p 80:81 cnn_splice_frontend
docker images
docker ps -a