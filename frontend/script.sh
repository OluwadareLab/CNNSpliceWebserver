#!/bin/bash
docker build -t cnn_splice_frontend .
docker run -it -d --name cnn_splice_frontend -p 8080:8080 cnn_splice_frontend
docker images
docker ps -a