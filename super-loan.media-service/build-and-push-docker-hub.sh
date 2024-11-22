#!/bin/bash

# Exit ngay lập tức nếu có bất kỳ lệnh nào lỗi
set -e

# Nhập các biến cần thiết
# echo "Nhập tên người dùng Docker Hub:"
# read DOCKER_USERNAME
# echo "Nhập tên repository trên Docker Hub:"
# read REPOSITORY
echo "Nhập tag cho image (ví dụ: latest hoặc v1.0.0):"
read TAG

# Tên đầy đủ của image
IMAGE_NAME="haphuthinh/loan_media-service:$TAG"

# # Đăng nhập vào Docker Hub
# echo "Đăng nhập vào Docker Hub..."
# docker login

# Build Docker image
echo "Building Docker image $IMAGE_NAME..."
docker build -t "$IMAGE_NAME" ./main

# Push Docker image lên Docker Hub
echo "Pushing Docker image to Docker Hub..."
docker push "$IMAGE_NAME"

# Thông báo hoàn thành
echo "Docker image đã được push thành công: $IMAGE_NAME"
