# Fuxly

A full-stack social media dashboard application that allows users to manage their social media profiles and view aggregated content.

## Overview

This application consists of:
- **Backend**: RESTful API built with Node.js, Express, and PostgreSQL using Prisma ORM
- **Frontend**: React application built with Vite

## Current Implementation Status

### ✅ Backend Features (Implemented)
- **Authentication System**
  - User registration with email verification
  - Secure login with JWT tokens
  - Password hashing using bcrypt
  
- **User Profile Management**
  - View profile information (bio, profile picture)
  - Update profile details
  - Account deletion with password verification
  
- **Social Links Management**
  - Add social media platform links (Twitter, Facebook, Instagram, etc.)
  - View all linked social media accounts
  - Remove social media links

### ⏳ Frontend Features (Pending Implementation)
The frontend structure is in place but requires implementation:
- Authentication pages (Login, Signup)
- Profile management page
- Social links management interface
- Application routing
- API service integration
- Styling and responsive design

## Technology Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT for authentication
- Bcrypt for password hashing

### Frontend
- React
- Vite (build tool)
- React Router (for navigation)
- CSS3

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- PostgreSQL database
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on the example:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/socialdb"
   JWT_SECRET="your_jwt_secret_here"
   PORT=3000
   ```
4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
   *(Note: Currently uses `nodemon` for development)*

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### User Profile
- `GET /api/account/profile` - Get user profile
- `POST /api/account/profile` - Update profile
- `DELETE /api/account/profile` - Delete account
- `PATCH /api/account/profile` - Partial profile update

### Social Links
- `POST /api/social/addPlatform` - Add social link
- `GET /api/social/getPlatforms` - Get user's social links
- `DELETE /api/social/deletePlatform` - Delete social link

## Database Schema

### User Model
```
id          Int      @id @default(autoincrement())
email       String   @unique
username    String   @unique
password    String
socialLinks Links[]
profilepic  String?
bio         String?
```

### Links Model
```
id        Int      @id @default(autoincrement())
url       String
platform  String
userId    Int
user      User   @relation(fields: [userId], references: [id], onDelete: Cascade)
```

## Project Structure

```
social-dashboard/
├── backend/
│   ├── src/
    │   ├── auth.js          # Authentication routes
    │   ├── social.js        # Social links management
    │   ├── profile.js       # Profile management
    │   ├── middleware.js    # Authentication middleware
    │   └── index.js         # Express app entry point
    ├── prisma/
    │   └── schema.prisma    # Database schema
    ├── package.json
    └── .env                 # Environment variables (create this)
└── frontend/
    ├── src/
    │   ├── components/      # Component files (to be implemented)
    │   ├── App.jsx          # Main app component
    │   └── main.jsx         # Entry point
    ├── public/
    │   └── vite.svg
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Future Enhancements

1. **Frontend Implementation**
   - Complete all React components
   - Implement routing
   - Add API service layer
   - Add form validation
   - Implement responsive design

2. **Feature Enhancements**
   - Social media feed aggregation
   - Real-time updates using WebSockets
   - Post scheduling functionality
   - Analytics dashboard
   - OAuth integration with social platforms

3. **DevOps & Quality**
   - Add comprehensive testing
   - Implement CI/CD pipeline
   - Add Docker support
   - Improve error handling and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with Node.js, Express, React, and Vite
- Uses Prisma for ORM
- Authentication secured with JWT and bcrypt
