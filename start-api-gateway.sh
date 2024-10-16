#!/bin/bash

# Điều hướng đến thư mục của API Gateway
cd ./api-gateway

# Cài đặt các dependencies nếu chưa có
npm install

# Khởi động ứng dụng với PM2
pm2 start npm --name "api-gateway" -- run start

# Kiểm tra trạng thái ứng dụng
pm2 status
