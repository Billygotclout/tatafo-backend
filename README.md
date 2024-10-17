

# Tatafo Chat App Backend

Tatafo is a Nigerian chat application built using Node.js, Express, and MongoDB. The app provides secure, real-time messaging between individual users and groups. Focusing on privacy and ease of use, Tatafo ensures seamless communication for users through various features.

## Features

### User Authentication
- **Login & Signup**: Secure user authentication with easy login and registration.
  
### Private Messaging
- **One-on-One Messaging**: Start a private conversation with any other user.
  
### Media Sharing
- **Send Media**: Exchange videos, images, and documents between individual users.

### Group Chat
- **Create Groups**: Users can create and join groups to have conversations with multiple people simultaneously.

### End-to-End Encryption
- **Secure Communication**: All messages are encrypted, ensuring privacy and security.

### Message Indicators
- **Read Receipts**: Know when the recipient has read your message with real-time message status indicators.

### Push Notifications
- **Instant Alerts**: Receive push notifications whenever a new message is sent or received, even when you're not using the app.

## Technology Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Communication**: Pusher (WebSockets)
- **Security**: End-to-End Encryption

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tatafo.git
   ```
2. Navigate to the project directory:
   ```bash
   cd tatafo-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables (such as MongoDB connection string, JWT secret, etc.)
5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

Once the server is running, you can access the app locally via `http://localhost:3000`.

## Contributing

Feel free to fork the project and submit a pull request if you'd like to contribute or fix any issues.

