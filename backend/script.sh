#!/bin/bash
docker build -t cnn_splice_backend .
docker run -it -d --name cnn_splice_backend -p 8081:8080 -v /storage/store/CNNSpliceWebserver:${PWD} cnn_splice_backend
docker images
docker ps -a
