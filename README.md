# Whisper - Chat Application

## Overview
This real-time chatting application was developed as a learning project and includes a range of impressive features. I have attached some screenshots below.

> ## Note
> **This project was created for learning, so it doesn't follow formal system design principles. As I gained more knowledge in software engineering, I designed a more scalable system that I hope to integrate in the future. I have added the new system design below. If anyone wants to contribute, please reach out to me.**

## Features
- Authentication 🔒
- Support one-to-one chat 💬
- Support Group Chats 🗣️
- File sharing (image, video, etc.) 📂
- Sent, Delivered, and Read receipts of the messages 📨
- Push Notifications 🔔
- Show the last seen time of users ⏰

## Data model design
This is the general data model which reflects our requirements.
[View on Eraser![](https://app.eraser.io/workspace/pebNGfBIbDZOKwAY521V/preview?elements=MOQTeLpzPWULSjj7dD0PTw&type=embed)](https://app.eraser.io/workspace/pebNGfBIbDZOKwAY521V?elements=MOQTeLpzPWULSjj7dD0PTw)

## API Design
Let us do a basic API design for our services:

### User Authentication
- `POST /register`: Register a new user.
- `POST /login`: Login and generate a JWT token.
- `GET /logout`: Logout a user.

### User Management
- `GET /users/:id`: Get user details.
- `PUT /users/:id`: Update user details.
- `GET /users/:id/last-seen`: Get the user's last seen time.

### Chat Management
- `POST /chats`: Create a new chat (one-to-one or group).
- `GET /chats/:id`: Get chat details.
- `POST /chats/:id/users`: Add users to a group chat.
- `DELETE /chats/:id/users/:userId`: Remove users from a group chat.

### Message Management
- `GET /chats/:id/messages`: Get messages for a chat.
- `POST /chats/:id/messages`: Send a message.

### Status Management
- `GET message/:id/status`: Retrieve the status of a specific message.
- `POST message/:id/status`: Update the status of a specific message.

### File Upload
- `POST chats/:id/files`: Upload a file and get the URL.
- `GET chats/:id/files`: Files associated with a specific chat.
- `DELETE files/:id`: Delete a specific file.

## High Level Design
![WhatsAppHLD (1)](https://github.com/user-attachments/assets/bbbc2cba-8e8a-482c-9d25-42442831f1bf)

