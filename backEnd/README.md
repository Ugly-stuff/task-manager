# Task Manager Backend API

RESTful API for the Task Manager application built with Node.js, Express, and MongoDB.

## 🎯 Features

- 🚀 RESTful API design
- 💾 MongoDB with Mongoose ODM
- ✅ Input validation and error handling
- 🔒 Environment variable management
- 📝 Request logging and error tracking
- 🌐 CORS enabled for frontend integration
- 📦 Modular route structure

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## 📁 Project Structure

```
backEnd/
├── models/
│   └── Task.js              # MongoDB Mongoose schema
├── routes/
│   └── taskRoutes.js        # API route handlers
├── server.js                # Express server setup
├── package.json
├── .env                     # Environment variables
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- MongoDB Atlas account (free tier available)

### Installation

1. Navigate to backend directory:
```bash
cd backEnd
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
NODE_ENV=development
```

4. Start the server:
```bash
npm start          # Production mode
npm run dev        # Development mode with auto-reload
```

The API will be available at `http://localhost:5000`

## 📚 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Tasks

#### Get All Tasks
```
GET /tasks
```
**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

#### Get Single Task
```
GET /tasks/:id
```
**Response:** Single task object

#### Create Task
```
POST /tasks
Content-Type: application/json

{
  "title": "Task title",
  "description": "Task description (optional)"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### Update Task
```
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

**Response:** Updated task object

#### Delete Task
```
DELETE /tasks/:id
```

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

## 🔍 Input Validation

### Title
- ✅ Required
- ✅ Must be 1-100 characters
- ✅ Trimmed of whitespace

### Description
- ⚪ Optional
- ✅ Maximum 500 characters
- ✅ Trimmed of whitespace

### Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad request (validation error)
- `404` - Not found
- `500` - Server error

## 🔐 Error Handling

All errors include descriptive messages:

```json
{
  "error": "Task title is required"
}
```

### Common Errors

| Status | Error | Cause |
|--------|-------|-------|
| 400 | Task title is required | Title not provided |
| 400 | Invalid task ID | Malformed MongoDB ID |
| 404 | Task not found | ID doesn't exist |
| 500 | Internal server error | Unexpected error |

## 🗳️ MongoDB Schema

### Task Schema

```javascript
{
  _id: ObjectId,
  title: String (required, max 100),
  description: String (max 500),
  completed: Boolean (default: false),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Indexes:**
- createdAt (for sorting by date)

## 🔒 Security Practices

- ✅ Environment variables for secrets
- ✅ Input validation on all endpoints
- ✅ CORS enabled for specified origins
- ✅ Error messages don't leak sensitive info
- ✅ Proper HTTP status codes
- ✅ MongoDB injection protection via Mongoose

## 📊 Performance Considerations

- Tasks are sorted by `createdAt` in descending order (newest first)
- Indexed searching on `createdAt` for efficient queries
- Request validation prevents invalid data in database
- Error handling prevents server crashes

## 🧪 Testing the API

### Using cURL

**Get all tasks:**
```bash
curl http://localhost:5000/api/tasks
```

**Create task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","description":"Task description"}'
```

**Update task:**
```bash
curl -X PUT http://localhost:5000/api/tasks/[TASK_ID] \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

**Delete task:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/[TASK_ID]
```

### Using Postman

1. Import the API endpoints
2. Set base URL to `http://localhost:5000/api`
3. Create collection for Tasks resource
4. Test each endpoint

### Using REST Client (VS Code)

Create a file named `requests.http`:

```http
### Get all tasks
GET http://localhost:5000/api/tasks

### Create task
POST http://localhost:5000/api/tasks
Content-Type: application/json

{
  "title": "New Task",
  "description": "Description here"
}

### Update task
PUT http://localhost:5000/api/tasks/:id
Content-Type: application/json

{
  "completed": true
}

### Delete task
DELETE http://localhost:5000/api/tasks/:id
```

## 🔧 Development

### Adding a New Endpoint

1. Define route in `routes/taskRoutes.js`
2. Add validation logic
3. Add error handling with try-catch
4. Return proper HTTP status codes
5. Test thoroughly

### Example Endpoint

```javascript
router.post("/", async (req, res, next) => {
  try {
    const { title, description } = req.body

    // Validation
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" })
    }

    // Create and save
    const task = new Task({
      title: title.trim(),
      description: description?.trim() || ""
    })
    await task.save()

    // Return success
    res.status(201).json(task)
  } catch (error) {
    next(error)
  }
})
```

## 🌍 Deployment

### To Deploy to Production

1. Set environment variables on hosting platform
2. Ensure MongoDB connection is secure
3. Update NODE_ENV to `production`
4. Build and deploy:
```bash
npm start
```

### Hosting Options

- Heroku (with MongoDB Atlas)
- AWS (EC2 + RDS)
- DigitalOcean (Droplet)
- Railway.app
- Render.com

## 📦 Dependencies

```json
{
  "cors": "^2.8.6",
  "dotenv": "^17.3.1",
  "express": "^5.2.1",
  "mongoose": "^9.2.4"
}
```

## 🐛 Troubleshooting

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED
```
- Check MongoDB URI is correct
- Ensure IP is whitelisted in MongoDB Atlas
- Verify network connectivity

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### CORS Errors
Add frontend URL to CORS configuration in `server.js`

### 500 Internal Server Error
- Check error logs in console
- Verify database connection
- Check input validation

## 📝 Logging

Access MongoDB Compass or MongoDB Atlas UI to view:
- Task documents
- Creation/update timestamps
- Database storage usage

## 🔄 Future Enhancements

- [ ] User authentication
- [ ] User-specific task filtering
- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Task priority levels
- [ ] Database backups
- [ ] Advanced filtering and searching
- [ ] Pagination support

---

**Built with ❤️ using Node.js and Express**
