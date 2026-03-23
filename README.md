# Task Manager Application

# FrontEND

Modern React frontend for the Task Manager application built with TypeScript, Vite, and Axios.

Features

Modern, responsive UI
Create, read, update, and delete tasks
Mark tasks as complete/incomplete
View task statistics
Real time form validation
Error handling
Loading states
Responsive design

Tech Stack:

React - UI framework
TypeScript - Type safe development
Vite - Build tool
Axios - HTTP client
CSS3 - Styling

Project Structure

/src

TaskForm.tsx & TaskForm.css -- Form to create new tasks
TaskItem.tsx & TaskItem.css -- Individual task
TaskList.tsx & TaskList.css -- Task list

/hooks
useTasks.ts -- State management

/services
api.ts -- API calls

/types
task.ts -- Types

Frontend runs on: http://localhost:5173

---

BackEND

# BackEND

Backend API for the Task Manager application built with Node.js, Express, and MongoDB.

Features

Create, read, update, delete tasks
MongoDB database integration
REST API
Error handling
Validation

Tech Stack:

Node.js - Runtime
Express.js - Framework
MongoDB - Database
Mongoose - ODM
CORS - Cross origin handling
dotenv - Environment variables

Project Structure

/backEnd

/models
Task.js -- Database schema

/routes
taskRoutes.js -- API routes

server.js -- Main server

Backend runs on: http://localhost:5000

---

## Setup BackEND

cd backEnd
npm install

Create `.env` file:

PORT=5000, it wil be change
MONGODB_URI=enterYourMongodbURL
Run:
npm run dev

### Setup Frontend

cd frontEnd
npm install
npm run dev

## API Endpoints

GET /api/tasks
POST /api/tasks
GET /api/tasks/:id
PUT /api/tasks/:id
DELETE /api/tasks/:id

## Notes

Backend should run on port 5000
Check CORS if API not working
MongoDB connection should be valid

Simple full stack task manager application.
