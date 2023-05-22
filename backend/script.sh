#!/bin/bash
docker build -t cnn_splice_backend .
docker run -it -d --name cnn_splice_backend -p 8080:8081 cnn_splice_backend
docker images
docker ps -a