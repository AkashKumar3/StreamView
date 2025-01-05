# YouTube Clone

This is a full-stack YouTube Clone application built with **React** for the frontend and **Node.js** with **Express** for the backend. The project includes features like user authentication, video upload, and playback functionality.

---

## Features

### Frontend React :
- Responsive user interface built using **React**.
- Routing with **React Router Dom**.
- State management using **Redux Toolkit**.
- Toast notifications for feedback using **React Toastify**.
- Smooth animations with **Framer Motion**.

### Backend (Node.js + Express):
- User authentication with **JWT (JSON Web Tokens)**.
- Secure password hashing using **bcrypt**.
- Database management with **MongoDB** and **Mongoose**.
- Environment configuration using **dotenv**.

### Project Tools:
- Development server powered by **Vite** for fast build times.
- Styling with **Tailwind CSS**.

---

## Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local instance or a cloud database like MongoDB Atlas)
- **Git** (optional for cloning the repository)

---

## Installation and Setup

### 1. Backend Setup
1. Navigate to the `youtube_clone_backend` directory.
   ```bash
   cd youtube_clone_backend
   ```

2. Install backend dependencies.
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory of the backend and add the following variables:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-secret-key>
   PORT=5000
   ```

4. Start the backend server.
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`.

---

### 2. Frontend Setup
1. Navigate to the `youtube_clone_frontend` directory.
   ```bash
   cd youtube_clone_frontend
   ```

2. Install frontend dependencies.
   ```bash
   npm install
   ```

3. Start the development server.
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` by default.

---

## Folder Structure

### Backend
```
youtube_clone_backend/
├── models/          # Mongoose models for database schemas
├── routes/          # Express routes for APIs
├── controllers/     # Business logic for APIs
├── middleware/      # Authentication and other middleware
├── server.js        # Main server entry point
├── package.json     # Dependencies and scripts
└── .env             # Environment variables (excluded from version control)
```

### Frontend
```
youtube_clone_frontend/
├── src/
│   ├── components/  # Reusable components
│   ├── pages/       # React pages for routing
│   ├── redux/       # Redux store and slices
│   ├── App.js       # Main application file
│   └── index.js     # React entry point
├── tailwind.config.js # Tailwind CSS configuration
├── vite.config.js     # Vite configuration
├── package.json       # Dependencies and scripts
└── .env               # Environment variables (if needed)
```

---

## Usage

1. Open the browser and navigate to `http://localhost:5173`.
2. The frontend will interact with the backend API hosted at `http://localhost:5000`.

---

## Scripts

### Backend
- `npm start`: Starts the backend server with **nodemon**.

### Frontend
- `npm run dev`: Starts the frontend development server.

---

## Technologies Used

### Frontend
- **React.js**
- **Redux Toolkit**
- **React Router DOM**
- **Framer Motion**
- **Tailwind CSS**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT**
- **bcrypt**

---

## Future Enhancements
- Add video recommendations.
- Implement video comments and likes.
- Add user subscriptions and notifications.

---

## Author
Developed by **Akash Kumar**.  
Feel free to reach out for any feedback or queries.

