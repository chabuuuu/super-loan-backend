#!/bin/bash

# Tên đầy đủ của image
IMAGE_NAME="haphuthinh/loan_media-service:$TAG"

echo "Pulling Docker image from Docker Hub..."
sudo docker pull "$IMAGE_NAME"

# Stop và xóa container cũ
echo "Stopping and removing old Docker container..."
sudo docker compose down

# Start lại docker compose
echo "Starting new Docker container..."
sudo docker compose up -d

# Thông báo hoàn thành
echo "Deploy thành công"
