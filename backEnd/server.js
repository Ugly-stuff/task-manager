import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import taskRoutes from "./routes/taskRoutes.js"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// API Routes
app.use("/api/tasks", taskRoutes)

// Setting up MongoDB connection, here im using MongoDB atlas virtual database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Checking whether its getting my API or Not
app.get("/", (req, res) => {
    res.json({ message: "API Running!!" })
})

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" })
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: err.message || "Internal server error" })
})

const PORT = process.env.PORT || 5000 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})