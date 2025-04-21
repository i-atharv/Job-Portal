import express from 'express'
import serverless from 'serverless-http'
import cors from 'cors'
import * as Sentry from '@sentry/node'
import { clerkWebhooks } from '../controllers/webhooks.js'
import connectDB from '../config/db.js'

const app = express()

// Setup middleware
app.use(cors())
app.use(express.json())

// Connect to DB (lazy loading)
let isDbConnected = false
async function ensureDbConnection() {
  if (!isDbConnected) {
    await connectDB()
    isDbConnected = true
  }
}

// Routes
app.get('/', async (req, res) => {
  await ensureDbConnection()
  res.send('API Working')
})

app.get('/debug-sentry', (req, res) => {
  throw new Error("My first Sentry error!")
})

app.post('/webhooks', async (req, res, next) => {
  await ensureDbConnection()
  return clerkWebhooks(req, res, next)
})

// Export as handler
export const handler = serverless(app)
