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
