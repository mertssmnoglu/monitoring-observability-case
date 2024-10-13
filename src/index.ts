import express from "express"
import http from "node:http"
import router from "./route"

const app = express()

// Using JSON as the request and response body by default
app.use(express.json())

// Routing operations
app.use("/api/v1", router)

const server = http.createServer(app)
const port = process.env.PORT || 3000

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// Graceful shutdown
const gracefulShutdown = () => {
  console.log("Received kill signal, shutting down gracefully.")
  server.close(() => {
    console.log("Closed out remaining connections.")
    process.exit(0)
  })

  // If after 10 seconds, forcefully shut down
  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    )
    process.exit(1)
  }, 10000)
}

// Listen for termination signals
process.on("SIGTERM", gracefulShutdown)
process.on("SIGINT", gracefulShutdown)
